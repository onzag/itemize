/**
 * This file specifies a base for creating a USSD provider
 * and phone providers as, they contain functions that are
 * necessary and shouldn't be touched and others that should
 * be overriden into what is a standard service
 * 
 * @module
 */

import { IUSSDAction, IUSSDChunk } from "../../../ussd";
import { ServiceProvider, ServiceProviderType } from "..";
import { ssrGenerator } from "../../ssr/generator";
import { CONNECTOR_SQL_COLUMN_ID_FK_NAME } from "../../../constants";
import type ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import { jwtSign } from "../../token";

function chunkSubstr(str: string, size: number) {
  const numChunks = Math.ceil(str.length / size)
  const chunks = new Array(numChunks)

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size)
  }

  return chunks
}

interface IUSSDSessionChunk {
  content: string;
  hasPaginatorPrev: boolean;
  hasPaginatorNext: boolean;
  actionMap: {
    [inputId: string]: IUSSDAction,
  }
}

interface IUSSDSession {
  phoneNumber: string;
  country: string;
  language: string;
  currency: string;
  activeChunk: IUSSDChunk;
  activeData: IUSSDSessionChunk[];
  activeDataIndex: number;
  activeDataAction: IUSSDAction;
  token: string;
}

export interface IUSSDExpectedAction {
  message: string;
  inputMode: boolean;
}

/**
 * The PhoneProvider class is a service that provides SMS
 * functionality to the itemize server side app
 * 
 * The LoggingProvider class is a special class, and does not support
 * global mode, even if specified
 */
export default class USSDProvider<T> extends ServiceProvider<T> {
  public static getType() {
    return ServiceProviderType.LOCAL;
  }

  public splitSize: number = 182;
  public paginatorPrev: string = "<";
  public paginatorNext: string = ">";
  public paginatorSeparator: string = " ";
  public paginatorPrevReverse: boolean = true;
  public paginatorNextReverse: boolean = false;
  public paginatorPrevNumericId: number = 1;
  public paginatorNextNumericId: number = 0;
  public separator: string = ":";
  public wordSplitter: string = " ";

  public unattendedSessionExpiresTime: number = 86400000;

  private sessions: {
    [phoneNumber: string]: IUSSDSession;
  } = {};
  private sessionsTimeouts: {
    [phoneNumber: string]: any;
  } = {};

  public hasSession(phoneNumber: string) {
    return !!this.sessions[phoneNumber];
  }

  /**
   * Call this function once a session is created for a given user
   * 
   * @param phoneNumber the phone number in international form
   */
  public async startSession(phoneNumber: string, country: string, language: string, currency: string): Promise<IUSSDExpectedAction> {
    clearTimeout(this.sessionsTimeouts[phoneNumber]);

    const userIdef = this.localAppData.root.registry["users/user"] as ItemDefinition;
    const userTable = userIdef.getQualifiedPathName();
    const userWithThatPhone = await this.localAppData.databaseConnection.queryFirst(
      `SELECT ${JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME)}, "role", "session_id" FROM ${JSON.stringify(userTable)} ` +
      `WHERE "phone"=$1 AND "p_validated"=$2 LIMIT 1`,
      [
        phoneNumber,
        true,
      ],
    );

    const token = userWithThatPhone ? await jwtSign({
      id: userWithThatPhone[CONNECTOR_SQL_COLUMN_ID_FK_NAME],
      role: userWithThatPhone.role,
      sessionId: userWithThatPhone.session_id || 0,
    }, this.localAppData.sensitiveConfig.jwtKey) : null;

    const chunk = (await ssrGenerator(
      this.localAppData,
      "production",
      {
        mode: "ussd",
        clientCountry: country,
        clientCurrency: currency,
        clientLanguage: language,
        token,
        url: "/",
      }
    )) as IUSSDChunk;

    this.sessions[phoneNumber] = {
      phoneNumber,
      country,
      language,
      currency,
      activeChunk: chunk,
      activeData: await this.splitter(chunk),
      activeDataIndex: 0,
      activeDataAction: null,
      token,
    }

    this.sessionsTimeouts[phoneNumber] = setTimeout(this.endSession.bind(this, phoneNumber), this.unattendedSessionExpiresTime);

    return {
      message: this.sessions[phoneNumber].activeData[0].content,
      inputMode: false,
    };
  }

  public async continueSession(phoneNumber: string, country: string, language: string, currency: string, input: string): Promise<IUSSDExpectedAction> {
    if (!this.sessions[phoneNumber]) {
      return this.startSession(phoneNumber, country, language, currency);
    }

    const currentSession = this.sessions[phoneNumber];
    const activeData = currentSession.activeData[currentSession.activeDataIndex];

    // this means it was in input mode last time
    if (currentSession.activeDataAction) {
      // let's execute the action we had last time
      const newURL = await currentSession.activeDataAction.onInputReceived(
        this.localAppData,
        input,
      );

      // and now it's done
      currentSession.activeDataAction = null;

      // if we were requested a redirect
      if (typeof newURL === "string") {
        // let's server side render the new chunk
        const newChunk = (await ssrGenerator(
          this.localAppData,
          "production",
          {
            mode: "ussd",
            clientCountry: currentSession.country,
            clientCurrency: currentSession.currency,
            clientLanguage: currentSession.language,
            token: currentSession.token,
            url: newURL,
          }
        )) as IUSSDChunk;

        // and now we can reset this to the new chunk
        currentSession.activeChunk = newChunk;
        currentSession.activeDataIndex = 0;
        currentSession.activeData = await this.splitter(newChunk);
      }
    } else if (input === this.paginatorNextNumericId.toString() && activeData.hasPaginatorNext) {
      // pagination
      currentSession.activeDataIndex++;
    } else if (input === this.paginatorPrevNumericId.toString() && activeData.hasPaginatorPrev) {
      currentSession.activeDataIndex--;
    } else {
      // otherwise let's find if we have a mapped action to that
      const executedAction = activeData.actionMap[input];
      if (!executedAction) {
        // no change return the same we have right now
        // user did invalid input
      } else {
        // otherwise user selected an action
        // and in this case it requests for input of sorts
        if (executedAction.requestInputValue) {
          // let's pick that thing
          currentSession.activeDataAction = executedAction;

          return {
            message: executedAction.inputValueLabel.length > this.splitSize ?
              executedAction.inputValueLabel.substr(0, this.splitSize) :
              executedAction.inputValueLabel,
            inputMode: true,
          }
        } else {
          // otherwise it's a bare action
          const newURL = await executedAction.onInputReceived(this.localAppData, null);

          // and if it requests a redirect
          if (typeof newURL === "string") {
            // let's make a new chunk
            const newChunk = (await ssrGenerator(
              this.localAppData,
              "production",
              {
                mode: "ussd",
                clientCountry: currentSession.country,
                clientCurrency: currentSession.currency,
                clientLanguage: currentSession.language,
                token: currentSession.token,
                url: newURL,
              }
            )) as IUSSDChunk;

            currentSession.activeChunk = newChunk;
            currentSession.activeDataIndex = 0;
            currentSession.activeDataAction = null;
            currentSession.activeData = await this.splitter(newChunk);
          }
        }
      }
    }

    return {
      message: currentSession.activeData[currentSession.activeDataIndex].content,
      inputMode: false,
    };
  }

  public async endSession(phoneNumber: string): Promise<void> {
    clearTimeout(this.sessionsTimeouts[phoneNumber]);

    delete this.sessions[phoneNumber];
  }

  public formatter(
    text: string,
    actions: IUSSDAction[],
    actionIndexBeginsAt: number,
    paginatorPrev: string,
    paginatorNext: string,
  ): IUSSDSessionChunk {
    let content: string = (paginatorPrev ? paginatorPrev + (text ? "\n" : "") : "") + (text || "");
    const actionMap: any = {};
    actions.forEach((a, i) => {
      content += (content ? "\n" : "") + (i + actionIndexBeginsAt).toString() + this.separator + a.label;
      actionMap[i + actionIndexBeginsAt] = a;
    });
    if (paginatorNext) {
      content += (content ? "\n" : "") + paginatorNext;
    }
    return {
      actionMap,
      content,
      hasPaginatorNext: !!paginatorNext,
      hasPaginatorPrev: !!paginatorPrev,
    };
  }

  /**
   * This is the code that is used to split the message into digestible
   * chunks, remember that to include the paginator prefixes into the digestible chunks
   * 
   * This splitter assumes GSM-7 bit encoding, and it's fixed to a 182 character size refer to the
   * splitSize if you want to change how the splitting mechanism works regarding this
   * 
   * You are given back a standard string during the sessions and it is the role of the
   * provider mechanism to decide how to handle these split chunks
   * 
   * Space for the paginators are also required as well as space for the numeric formats of
   * the actions
   * 
   * Overriding is not necessary but possible
   * 
   * @override
   */
  public splitter(chunk: IUSSDChunk): IUSSDSessionChunk[] | Promise<IUSSDSessionChunk[]> {
    const oneChunkTry = this.formatter(
      chunk.content,
      chunk.actions,
      1,
      "",
      "",
    );

    if (oneChunkTry.content.length <= this.splitSize) {
      return [oneChunkTry];
    }

    const result: IUSSDSessionChunk[] = [];

    // < 1
    const paginatorPrev = this.paginatorPrevReverse ? (
      this.paginatorPrevNumericId.toString() + this.paginatorSeparator + this.paginatorPrev
    ) : (
      this.paginatorPrev + this.paginatorSeparator + this.paginatorPrevNumericId.toString()
    );
    const paginatorNext = this.paginatorNextReverse ? (
      this.paginatorNextNumericId.toString() + this.paginatorSeparator + this.paginatorNext
    ) : (
      this.paginatorNext + this.paginatorSeparator + this.paginatorNextNumericId.toString()
    );

    // -3 because of the newlines, 2 for the paginators one for the content
    const maxMiddleContentSize: number = this.splitSize - paginatorNext.length - paginatorPrev.length - 3;

    if (chunk.content) {
      let chunks: string[] = [
        ""
      ];

      const wordSplittedContent = chunk.content.split(this.wordSplitter);
      
      wordSplittedContent.forEach((word) => {
        if (word.length > maxMiddleContentSize) {
          // THIS SHOULD NOT HAPPEN
          // what kind of massive word is this
          // this is not optimal but for debug purposes
          chunks = chunks.concat(chunkSubstr(word, maxMiddleContentSize));
          return;
        }

        if (chunks[chunks.length - 1].length + this.wordSplitter.length + word.length > maxMiddleContentSize) {
          chunks.push("");
        }

        chunks[chunks.length - 1] += this.wordSplitter + word;
      });

      chunks.forEach((c, index) => {
        result.push(this.formatter(
          c,
          [],
          1,
          index === 0 ? null : paginatorPrev,
          c.length - 1 !== index || chunk.actions.length ? paginatorNext : null,
        ));
      });
    }

    let workInProgressActionChunk: IUSSDSessionChunk = null;
    let workInProgressActions: IUSSDAction[] = null;

    // so we loop in our actions
    chunk.actions.forEach((a, index) => {
      const isLast = index === chunk.actions.length - 1;
      const newPotentialChunk = this.formatter(
        null,
        workInProgressActions ? workInProgressActions.concat([a]) : [a],
        1,
        result.length ? paginatorPrev : null,
        isLast ? null : paginatorNext,
      );

      // potential chunk has been rejected because it is too big
      if (newPotentialChunk.content.length > this.splitSize) {
        // the work in progress chunk that caused the rejection
        // should exist unless it's just this one single action
        // that caused it, in that case we can push the previous
        // knowing that it's for sure valid as potential chunks
        // are not set unless they are of a proper size
        if (workInProgressActionChunk !== null) {
          // in this case we have a chunk previously
          // that we just extended that ended up too big
          result.push(workInProgressActionChunk);
          workInProgressActionChunk = null;
          workInProgressActions = null;
        } else {
          // THIS SHOULDNT HAPPEN
          // what kind of massive action label is used
          // basically we manage to create one single chunk
          // wiht one single value that overflowed already

          // bit of a hack to make it fit, shrink its label
          result.push(
            this.formatter(
              null,
              [{
                ...a,
                label: a.label.substr(0, maxMiddleContentSize - this.separator.length - 2),
              }],
              1,
              result.length ? paginatorPrev : null,
              isLast ? null : paginatorNext,
            )
          )
        }
      } else {
        workInProgressActionChunk = newPotentialChunk;
        workInProgressActions = workInProgressActions ? workInProgressActions.concat([a]) : [a];
      }
    });

    return result;
  }
}