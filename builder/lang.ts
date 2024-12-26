/**
 * This file contains the language utilities that build the primary language
 * information for the main language file that belongs to the root as well
 * as for the lang.json file
 *
 * @module
 */

import Traceback from "./Traceback";
import { checkExists, getActualFileLocation } from "./util";
import { LOCALE_I18N, ROOT_REQUIRED_LOCALE_I18N } from "../constants";
import CheckUpError from "./Error";
import { Ii18NType, ILangLocalesType } from "../base/Root";
import path from "path";
import { IBuilderBasicConfigType } from "./config";
import { propertiesReader } from "./properties-reader";
import fs from "fs";
const fsAsync = fs.promises;
import ts from "typescript";
import uuid from "uuid";

/**
 * Given the properties information provides all the key names
 * that exist within that properties information as an array
 * of string
 * @param obj the object to recurse
 * @param prefix the prefix to use
 * @returns an array of string with the . separated names
 */
function getAllKeyNames(obj: any, prefix: string) {
  // this is the result
  let result: string[] = [];
  Object.keys(obj).forEach((key) => {
    // so get the value
    const value = obj[key];
    // if the value is a string, we've hit a leaf
    // or if it contains that object inside it's a leaf with
    // variations in it
    if (typeof value === "string" || value["&"]) {
      result.push(prefix + key);
    } else {
      // otherwise let's keep getting in
      result = result.concat(getAllKeyNames(value, prefix + key + "."));
    }
  });
  // return the result
  return result;
}

/**
 * Merges two properties file, used to merge the root
 * with the main while ensuring that errors are merged
 * property
 * @param base this would be the main i18n data
 * @param override this would be the root
 */
function propertiesMerge(base: any, override: any) {
  Object.keys(override).forEach((key) => {
    const value = override[key];
    if (!base[key]) {
      base[key] = value;
    } else if (typeof value !== "string" && typeof base[key] !== "string") {
      propertiesMerge(base[key], value);
    } else {
      base[key] = value;
    }
  });
}

/**
 * Build the core language data that holds information
 * about the language itself and other localizables
 * @param supportedLanguages the array of supported languages
 * @param actualRootLocation the root location that sets these languages
 * @param traceback the traceback in the location
 * @retuns a promise for locale language data
 */
export async function buildLang(
  rawDataConfig: IBuilderBasicConfigType,
  actualRootLocation: string,
  i18nBaseFileLocation: string,
  traceback: Traceback,
): Promise<Ii18NType> {
  const languageFileLocation = actualRootLocation
    .replace(".json", ".properties");

  const baseFileLocation = await getActualFileLocation(
    [path.dirname(actualRootLocation), i18nBaseFileLocation],
    traceback,
    "properties",
  );

  // this is the root of the index.properties that is used to extend
  // the base
  await checkExists(
    languageFileLocation,
    traceback,
  );

  const propertiesBase = await propertiesReader(baseFileLocation);
  const propertiesRoot = await propertiesReader(languageFileLocation);

  const result: Ii18NType = {};

  const internalTracebackBaseFile = traceback.newTraceToLocation(i18nBaseFileLocation);
  const internalTracebackRootFile = traceback.newTraceToLocation(languageFileLocation);

  const extraGatheredProperties: {
    [locale: string]: string[];
  } = {};

  // and start to loop
  rawDataConfig.standard.supportedLanguages.forEach((locale) => {

    if (!propertiesBase[locale]) {
      throw new CheckUpError(
        "File does not include language data for '" + locale + "'",
        internalTracebackBaseFile,
      );
    }

    result[locale] = {};

    const propertiesToRequest: Array<{ base: boolean, property: string }> =
      LOCALE_I18N.map((property) => ({ base: true, property }))
        .concat(ROOT_REQUIRED_LOCALE_I18N.map((property) => ({ base: false, property })));

    // we gather all the properties that were added in the root file, just to ensure
    // we have matching property values
    extraGatheredProperties[locale] = getAllKeyNames(propertiesRoot[locale], "");

    propertiesToRequest.forEach((propertyToRequestObject) => {
      const property = propertyToRequestObject.property;
      const propertySplitted = property.split(".");
      const internalTraceback = propertyToRequestObject.base ? internalTracebackBaseFile : internalTracebackRootFile;
      let propertyResult = propertiesBase[locale];
      if (!propertyToRequestObject.base) {
        propertyResult = propertiesRoot[locale];
      }

      if (!propertyResult) {
        throw new CheckUpError(
          "File does not include data for locale '" + locale + "'",
          internalTraceback,
        );
      }

      let propKey: string;
      // try to find it
      for (propKey of propertySplitted) {
        propertyResult = propertyResult[propKey];
        if (!propertyResult) {
          break;
        }
      }
      if (!propertyResult) {
        throw new CheckUpError(
          "File does not include data for '" + locale + "' in '" + property + "'",
          internalTraceback,
        );
      } else if (typeof propertyResult !== "string") {
        throw new CheckUpError(
          "File has an invalid type for '" + locale + "' in '" + property + "'",
          internalTraceback,
        );
      }

      propertyResult = propertyResult.trim();

      let whereToSet: any = result[locale];
      // by looping on the splitted value
      propertySplitted.forEach((keyValue, index) => {
        // on the last one we set it as the value
        if (index === propertySplitted.length - 1) {
          whereToSet[keyValue] = propertyResult;
          return;
        }

        // otherwise we try to get deeper
        whereToSet[keyValue] = whereToSet[keyValue] || {};
        whereToSet = whereToSet[keyValue];
      });
    });

    // this should overide into the result[locale]
    // and write into it for all the properties found in the root
    // for that same locale
    propertiesMerge(result[locale], propertiesRoot[locale]);
  });

  Object.keys(extraGatheredProperties).forEach((locale) => {
    const propertiesInLocale = extraGatheredProperties[locale];
    Object.keys(extraGatheredProperties).forEach((locale2) => {
      const propertiesInSecondLocale = extraGatheredProperties[locale2];

      propertiesInLocale.forEach((property) => {
        if (!propertiesInSecondLocale.find((p) => p === property)) {
          throw new CheckUpError(
            "File mismatch in locale '" + locale + "' and locale '" + locale2 +
            "' where a locale key '" + property + "' exists in the first but not in the later",
            internalTracebackRootFile,
          );
        }
      });
    });
  });

  return result;
}

/**
 * Clears language data in such a way that it leaves only the name
 * and the supported locales
 * @param rawData the raw locale language data
 * @param rawDataConfig the raw data config
 * @returns the new locale language data with only names
 */
export function clearLang(
  rawData: Ii18NType,
  rawDataConfig: IBuilderBasicConfigType,
) {
  const nRawData: ILangLocalesType = {};
  Object.keys(rawData).forEach((locale) => {
    nRawData[locale] = {
      name: rawData[locale].name as string,
      rtl: rawDataConfig.standard.rtlLanguages.includes(locale),
    };
  });

  return nRawData;
}

export function checkAllLangAgainstSources(
  rawData: Ii18NType,
  entryPath: string,
) {

}

function generateCombinations(potentialsLeft: string[], potentialsRight: string[]): string[] {
  const combinations: string[] = [];

  // Iterate through each element in the first array
  for (const potentialLeft of potentialsLeft) {
    // Combine with each element in the second array
    for (const potentialRight of potentialsRight) {
      combinations.push(potentialLeft + potentialRight);
    }
  }

  return combinations;
}

function unwrapExpression(expression: ts.Expression,): ts.Expression {
  // If the expression is wrapped in parentheses, recursively unwrap it
  if (ts.isParenthesizedExpression(expression)) {
    return unwrapExpression(expression.expression);
  }
  return expression;
}

interface IDeclaration {
  // decl: ts.VariableDeclaration | ts.ParameterDeclaration;
  potentials: Potential;
  //frozenContext: IDeclContextInfo;
}

interface ITypeDeclaration {
  // type: ts.TypeNode;
  potentials: Potential;
}

interface IDeclContextInfo {
  declarations: {
    [key: string]: IDeclaration;
  },
  types: {
    [key: string]: ITypeDeclaration;
  },
  parent?: IDeclContextInfo;
  id: string;
}

// function deepCopyDeclContext(context: IDeclContextInfo): IDeclContextInfo {
//   // Deep copy of declarations
//   const deepCopiedDeclarations: IDeclContextInfo = {
//     declarations: {},
//     types: {},
//     id: context.id,
//     parent: context.parent ? deepCopyDeclContext(context.parent) : null,
//   };
//   for (const key in context.declarations) {
//     deepCopiedDeclarations.declarations[key] = context.declarations[key]
//   }
//   for (const key in context.types) {
//     deepCopiedDeclarations.types[key] = context.types[key]
//   }

//   return deepCopiedDeclarations;
// }

function findDecl(which: string, declContext: IDeclContextInfo) {
  if (declContext.declarations[which]) {
    return declContext.declarations[which];
  }
  if (!declContext.parent) {
    return null;
  }

  return findDecl(which, declContext.parent);
}

function findType(which: string, declContext: IDeclContextInfo) {
  if (declContext.types[which]) {
    return declContext.types[which];
  }
  if (!declContext.parent) {
    return null;
  }

  return findType(which, declContext.parent);
}

interface Potential {
  self: string[];
  attributes: {
    [key: string]: Potential;
  }
}

function mergePotentials(potentials: Potential[]): Potential {
  const newPotential: Potential = {
    self: [],
    attributes: {},
  };
  potentials.forEach((v) => {
    newPotential.self = newPotential.self.concat(v.self);
    Object.keys(v.attributes).forEach((vKey) => {
      const vValue = v.attributes[vKey];
      if (!newPotential.attributes[vKey]) {
        newPotential.attributes[vKey] = vValue;
      } else {
        newPotential.attributes[vKey] = mergePotentials([newPotential.attributes[vKey], vValue]);
      }
    });
  });
  return newPotential;
}

function getPotentialsFromType(type: ts.TypeNode | ts.InterfaceDeclaration, declContext: IDeclContextInfo): Potential {
  if (ts.isUnionTypeNode(type)) {
    // Compound type assertion
    const types = type.types.map(t => getPotentialsFromType(t, declContext));
    return mergePotentials(types);
  } else if (ts.isLiteralTypeNode(type) && ts.isStringLiteral(type.literal)) {
    return {self: [type.literal.text], attributes: {}};
  } else if (ts.isTypeReferenceNode(type)) {
    const referrencedType = type.typeName.getText();
    const foundType = findType(referrencedType, declContext);
    if (foundType) {
      return foundType.potentials;
    }
  } else if (ts.isTypeLiteralNode(type) || ts.isInterfaceDeclaration(type)) {
    const potential: Potential = {self: [], attributes: {}};

    type.members.forEach(member => {
      if (ts.isPropertySignature(member) && ts.isIdentifier(member.name) && member.type) {
        potential.attributes[member.name.text] = getPotentialsFromType(member.type, declContext);
      }
    });

    return potential;
  }

  return {self: [], attributes: {}};
}

function evaluateStringExpressionPotentials(exprSrc: ts.Expression, declContext: IDeclContextInfo): Potential {
  const expr = unwrapExpression(exprSrc);

  if (ts.isAsExpression(expr)) {
    const type = expr.type;
    const potentialFromType = getPotentialsFromType(type, declContext);
    return potentialFromType;
  } else if (ts.isIdentifier(expr)) {
    const identifiesWhat = expr.text;
    const declarationOfIt = findDecl(identifiesWhat, declContext);
    if (!declarationOfIt) {
      // could not find the relevant variable
      return {self: [], attributes: {}};
    }

    return declarationOfIt.potentials;
  } else if (ts.isStringLiteral(expr)) {
    return {self: [expr.text], attributes: {}};
  } else if (ts.isBinaryExpression(expr)) {
    const { left, operatorToken, right } = expr;
    if (operatorToken.kind === ts.SyntaxKind.PlusToken) {
      const potentialsLeft = evaluateStringExpressionPotentials(left, declContext);
      const potentialsRight = evaluateStringExpressionPotentials(right, declContext);

      // one of them could not be determined therefore cancelling all of them
      if (potentialsLeft.self.length === 0 || potentialsRight.self.length === 0) {
        return {self: [], attributes: {}};
      }

      return {self: generateCombinations(potentialsLeft.self, potentialsRight.self), attributes: {}};
    } else {
      // no potentials, another operation type
      return {self: [], attributes: {}};
    }
  } else if (ts.isConditionalExpression(expr)) {
    const potentialsWhenTrue = evaluateStringExpressionPotentials(expr.whenTrue, declContext);
    const potentialsWhenFalse = evaluateStringExpressionPotentials(expr.whenFalse, declContext);

    return mergePotentials([potentialsWhenTrue, potentialsWhenFalse]);
  } else if (ts.isTemplateExpression(expr)) {
    let invalid = false;
    const subPotentials = [[expr.head.text]];
    expr.templateSpans.forEach((span) => {
      const expressionValues = evaluateStringExpressionPotentials(span.expression, declContext);
      if (expressionValues.self.length === 0) {
        invalid = true;
      }
      subPotentials.push(expressionValues.self);
      subPotentials.push([span.literal.text]);
    });

    if (invalid) {
      return {self: [], attributes: {}};
    }

    return {self: subPotentials.reduce(generateCombinations), attributes: {}};
  } else if (ts.isPropertyAccessExpression(expr)) {
    const parts: string[] = [];
    let sourceVar: string;
    let current: ts.Expression = expr;

    while (ts.isPropertyAccessExpression(current)) {
      parts.unshift(current.name.text);
      current = current.expression;
    }

    if (ts.isIdentifier(current)) {
      sourceVar = current.text;
    }

    console.log(sourceVar, parts);
    console.log(declContext.declarations);
    let source = findDecl(sourceVar, declContext)?.potentials;

    if (!source) {
      return {self: [], attributes: {}};
    } else {
      for (let part of parts) {
        source = source.attributes[part];
        if (!source) {
          return {self: [], attributes: {}};
        }
      }

      return source;
    }
  }

  return {self: [], attributes: {}};
}

// Function to find all calls to a specific function or component
async function getAllLangPotentialsOf(filePath: string) {
  //const sourceCode = "const i18nx = 'hello' + (isCat ? '_cat' : 'dog')"//await fsAsync.readFile(filePath, "utf-8");
  const sourceCode = "const x = `hello${boi ? 'boi' : ''}cat${okay ? 'kitty' : ''}boy` as 'cat' | 'boi';(x: {text: 'kitten' | 'dog'}) => {const i18nx = x.text + 'cat';}"
  const sourceFile = ts.createSourceFile(filePath, sourceCode, ts.ScriptTarget.Latest, true);

  let allPotentialsOfThisFile: string[] = [];

  const visit = (node: ts.Node, declContext: IDeclContextInfo) => {
    //console.log("N", node);
    if (
      ts.isJsxAttribute(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text.startsWith("i18n")
    ) {
      const initializer = node.initializer;
      if (
        initializer &&
        ts.isJsxExpression(initializer) &&
        initializer.expression
      ) {
        const potentials = evaluateStringExpressionPotentials(initializer.expression, declContext);
        allPotentialsOfThisFile = allPotentialsOfThisFile.concat(potentials.self);
      } else if (
        initializer &&
        ts.isStringLiteral(initializer) &&
        initializer.text
      ) {
        allPotentialsOfThisFile.push(initializer.text);
      }
    }

    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text.startsWith("i18n")
    ) {
      const potentials = evaluateStringExpressionPotentials(node.initializer, declContext);
      allPotentialsOfThisFile = allPotentialsOfThisFile.concat(potentials.self);
    }

    if (
      ts.isPropertyAssignment(node)
    ) {
      if (
        (ts.isStringLiteral(node.name) && node.name.text.startsWith("i18n")) || // String keys
        (ts.isIdentifier(node.name) && node.name.text.startsWith("i18n")) // Identifier keys
      ) {
        const potentials = evaluateStringExpressionPotentials(node.initializer, declContext);
        allPotentialsOfThisFile = allPotentialsOfThisFile.concat(potentials.self);
      }
    }

    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      declContext.declarations[node.name.text] = ({
        //decl: node,
        potentials: evaluateStringExpressionPotentials(node.initializer, declContext),
      });
    } else if (ts.isTypeAliasDeclaration(node) && ts.isIdentifier(node.name)) {
      declContext.types[node.name.text] = {
        potentials: getPotentialsFromType(node.type, declContext),
      };
    } else if (ts.isInterfaceDeclaration(node) && ts.isIdentifier(node.name)) {
      declContext.types[node.name.text] = {
        potentials: getPotentialsFromType(node, declContext),
      };
    }

    if (
      ts.isFunctionDeclaration(node) ||
      ts.isBlock(node) ||
      ts.isArrowFunction(node) ||
      ts.isMethodDeclaration(node) ||
      ts.isFunctionExpression(node) ||
      ts.isConstructorDeclaration(node)
    ) {
      const newDeclContext: IDeclContextInfo = {
        declarations: {},
        parent: declContext,
        types: {},
        id: uuid.v4(),
      }
      if (
        ts.isArrowFunction(node) ||
        ts.isFunctionDeclaration(node) ||
        ts.isMethodDeclaration(node) ||
        ts.isConstructorDeclaration(node) ||
        ts.isFunctionExpression(node)
      ) {
        console.log("HERE");
        node.parameters.forEach((p) => {
          if (ts.isIdentifier(p.name)) {
            newDeclContext.declarations[p.name.text] = {
              potentials: getPotentialsFromType(p.type, declContext),
            }
          }
        });
      }

      console.log(newDeclContext);

      ts.forEachChild(node, (c) => {
        visit(c, newDeclContext);
      });
    } else {
      ts.forEachChild(node, (c) => {
        visit(c, declContext);
      });
    }
  };

  const declContextBase: IDeclContextInfo = {
    declarations: {},
    parent: null,
    id: uuid.v4(),
    types: {},
  }

  visit(sourceFile, declContextBase);

  console.log(allPotentialsOfThisFile);
}

getAllLangPotentialsOf("kitten/boi");