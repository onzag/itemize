import React, { useMemo, useRef } from "react";
import { loadLib } from "../../../util";
import type { INetwork, INetworkDbNode, INetworkServerNode } from "../../../server/network";
import { useUserDataRetriever } from "../../components/user/UserDataRetriever";
import { useCallback, useEffect, useState } from "react";
import type { ILogsRecord, ILogsResult, IPingsResult } from "../../../server/services/base/LoggingProvider";
import type { IServerPingDataPing } from "../../../server";
import { useRootRetriever } from "../../../client/components/root/RootRetriever";

interface ID3Node {
  // id of the node
  id: string;
  // group it belongs to
  group: string;
  // name of the network node
  name: string;
  // icon in svg format
  icon: string;
  color: string;
  alive: boolean;
}

interface ID3Link {
  source: string;
  target: string;
  value: number;
  alive: boolean;
}

const ELASTIC = (c: string, alive: boolean) => '<svg fill="white" opacity="' + (alive ? 1 : 0.3) + '" stroke="' + c + '" width="30px" height="30px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M11.27 15.58H1.61A11.81 11.81 0 0 1 1.07 12c0-1.25.18-2.45.54-3.58h15.86A3.57 3.57 0 0 1 21.05 12a3.56 3.56 0 0 1-3.55 3.58zm-.45 1.2H2.05a11.8 11.8 0 0 0 4.39 5.18A11.8 11.8 0 0 0 13 23.93c4.15 0 7.78-2.12 9.93-5.3a6.08 6.08 0 0 0-4.35-1.86zm7.76-9.55c1.7 0 3.25-.72 4.35-1.85A11.96 11.96 0 0 0 2.05 7.23h8.74z"/></svg>';
const REDIS = (c: string, alive: boolean) => '<svg opacity="' + (alive ? 1 : 0.3) + '" width="30px" height="30px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="white" stroke="' + c + '" d="M14.824 7.518c0 0.007 0.103 0.202 0.232 0.441 0.126 0.235 0.219 0.437 0.205 0.447s-0.371 0.146-0.792 0.295c-0.424 0.152-0.765 0.282-0.759 0.288s0.487 0.056 1.067 0.109c0.699 0.066 1.067 0.113 1.093 0.139 0.023 0.023 0.182 0.282 0.358 0.57l0.315 0.53 0.056-0.133c0.030-0.070 0.126-0.302 0.215-0.51l0.156-0.381 0.841-0.089c0.46-0.050 0.871-0.089 0.914-0.089 0.040-0.003 0.073-0.013 0.073-0.030 0-0.013-0.311-0.142-0.696-0.285-0.381-0.142-0.696-0.265-0.696-0.268s0.083-0.205 0.182-0.447 0.175-0.447 0.169-0.454c-0.007-0.010-0.331 0.089-0.715 0.215l-0.702 0.229-0.745-0.295c-0.732-0.288-0.772-0.301-0.772-0.282zM19.452 10.038c-0.891 0.354-1.623 0.649-1.63 0.656s0.656 0.275 1.474 0.6l1.484 0.586 0.159-0.063c1.653-0.643 3.157-1.242 3.15-1.249-0.023-0.027-2.948-1.172-2.981-1.172-0.023 0.003-0.768 0.291-1.656 0.643zM10.899 9.694c-0.855 0.089-1.573 0.338-1.878 0.653-0.209 0.215-0.242 0.398-0.113 0.619 0.192 0.331 0.822 0.61 1.693 0.752 0.391 0.066 1.54 0.056 1.938-0.013 0.931-0.162 1.534-0.46 1.676-0.835 0.053-0.139 0.053-0.159 0-0.295-0.139-0.364-0.732-0.666-1.61-0.818-0.444-0.076-1.272-0.106-1.706-0.063zM26.819 10.724c-0.043 0.056-0.202 0.182-0.354 0.285-0.451 0.291-1.034 0.556-4.651 2.113-2.544 1.093-3.193 1.381-4.074 1.805-0.977 0.467-1.381 0.596-1.872 0.596-0.441 0-0.702-0.076-1.524-0.441-0.328-0.146-1.67-0.709-2.981-1.255-5.734-2.385-5.84-2.435-6.148-2.766l-0.129-0.142v2.256l0.146 0.139c0.139 0.136 0.613 0.421 0.782 0.47 0.046 0.013 0.358 0.142 0.696 0.288s1.984 0.835 3.66 1.534c2.773 1.156 3.405 1.421 4.349 1.835 0.5 0.222 0.778 0.278 1.249 0.262 0.345-0.013 0.447-0.033 0.749-0.136 0.195-0.066 0.533-0.209 0.752-0.318 0.719-0.361 1.59-0.745 5.058-2.239 3.263-1.408 3.687-1.603 4.041-1.848 0.364-0.258 0.348-0.195 0.348-1.451 0-0.6-0.003-1.090-0.010-1.090s-0.043 0.046-0.086 0.103zM15.397 12.195c-1.335 0.205-2.441 0.381-2.461 0.388-0.030 0.010 3.326 1.421 3.468 1.457 0.033 0.010 1.534-2.15 1.534-2.206 0-0.030 0.003-0.033-2.541 0.361zM26.838 14.428c-0.030 0.050-0.169 0.172-0.305 0.268-0.434 0.298-1.086 0.596-5.052 2.302-2.282 0.984-2.998 1.299-3.677 1.63-1.1 0.533-1.365 0.619-1.954 0.616-0.457-0.003-0.739-0.076-1.345-0.351-0.583-0.268-1.236-0.543-3.856-1.63-4.558-1.891-5.085-2.127-5.406-2.438l-0.159-0.149v2.219l0.179 0.169c0.292 0.272 0.262 0.258 5.154 2.296 1.795 0.745 3.488 1.457 3.76 1.58 0.722 0.325 0.931 0.401 1.216 0.46 0.666 0.136 1.159 0.026 2.239-0.5 0.702-0.341 1.56-0.722 3.637-1.616 3.948-1.703 4.922-2.14 5.21-2.332 0.103-0.073 0.242-0.189 0.311-0.265l0.123-0.136v-1.11c0-0.61-0.003-1.11-0.010-1.11-0.003 0-0.033 0.043-0.066 0.096zM26.802 18.061c-0.262 0.328-0.785 0.58-4.856 2.332-2.657 1.146-3.465 1.504-4.339 1.921-0.918 0.437-1.219 0.53-1.749 0.53-0.361 0-0.729-0.086-1.136-0.265-0.951-0.417-1.577-0.682-4.353-1.838-3.157-1.315-4.167-1.742-4.505-1.911-0.315-0.159-0.636-0.384-0.709-0.5l-0.070-0.106v1.13c0 1.295-0.023 1.199 0.325 1.434 0.384 0.258 0.954 0.51 4.744 2.083 2.65 1.1 3.604 1.501 4.074 1.713 0.961 0.431 1.216 0.5 1.752 0.47 0.49-0.023 0.812-0.129 1.66-0.533 0.884-0.424 1.537-0.715 4.422-1.958 4.008-1.726 4.442-1.934 4.747-2.286l0.106-0.119v-1.106c0-0.61-0.003-1.11-0.007-1.11-0.007 0-0.053 0.053-0.106 0.119z"></path></svg>';
const PG = (c: string, alive: boolean) => '<svg opacity="' + (alive ? 1 : 0.3) + '" width="30px" height="30px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="white" stroke="' + c + '" d="M26.741 18.661c-0.24-0.278-0.65-0.202-0.967-0.139-0.762 0.136-1.591 0.294-2.329-0.023 1.318-2.080 2.355-4.351 2.935-6.748 0.211-0.911 0.374-1.843 0.343-2.781-0.023-0.525-0.096-1.084-0.417-1.519-0.794-1.047-1.945-1.81-3.214-2.151-1.585-0.43-3.285-0.302-4.844 0.18-0.129 0.026-0.256-0.032-0.382-0.048-1.415-0.287-2.975-0.174-4.202 0.645-1.473-0.53-3.056-0.85-4.624-0.686-1.166 0.121-2.337 0.663-3.006 1.656-0.846 1.239-0.961 2.821-0.826 4.273 0.272 1.928 0.742 3.826 1.34 5.677 0.394 1.154 0.828 2.317 1.529 3.325 0.356 0.495 0.829 0.994 1.466 1.072 0.566 0.069 1.078-0.282 1.425-0.698 0.6-0.718 1.217-1.423 1.857-2.105 0.418 0.205 0.872 0.323 1.336 0.358-0.251 0.298-0.458 0.687-0.858 0.804-0.539 0.208-1.17 0.18-1.645 0.539-0.274 0.196-0.287 0.623-0.041 0.848 0.445 0.432 1.101 0.525 1.693 0.575 0.839 0.064 1.687-0.218 2.324-0.768-0.004 1.334 0.002 2.672 0.152 3.999 0.075 0.777 0.41 1.551 1.001 2.074 0.557 0.486 1.351 0.587 2.058 0.464 0.694-0.132 1.407-0.34 1.949-0.814 0.576-0.508 0.822-1.275 0.936-2.011 0.207-1.319 0.364-2.644 0.514-3.969 1.483 0.25 3.161-0.034 4.269-1.117 0.237-0.223 0.462-0.609 0.228-0.912zM23.45 6.117c0.89 0.338 1.681 0.925 2.275 1.668 0.283 0.355 0.319 0.832 0.337 1.268 0.013 1.040-0.197 2.067-0.464 3.067-0.511 1.851-1.287 3.625-2.262 5.277-0.096 0.163-0.201 0.32-0.317 0.469-0.009-0.045-0.027-0.137-0.036-0.183 0.121-0.318 0.298-0.618 0.367-0.956 0.244-0.953 0.038-1.934-0.050-2.893-0.092-0.905 0.217-1.786 0.209-2.689 0.035-0.442-0.14-0.86-0.31-1.257-0.615-1.375-1.593-2.598-2.848-3.438-0.306-0.21-0.648-0.357-0.953-0.568 1.334-0.286 2.765-0.25 4.051 0.234zM22.637 13.836c0.078 1.071 0.389 2.221-0.116 3.237-0.677-1.347-1.552-2.633-1.857-4.133-0.086-0.477-0.108-1.081 0.316-1.413 0.538-0.382 1.241-0.296 1.863-0.258-0.027 0.859-0.291 1.702-0.205 2.567zM10.534 20.181c-0.243 0.286-0.571 0.627-0.985 0.542-0.484-0.14-0.792-0.582-1.062-0.979-0.729-1.166-1.168-2.483-1.571-3.79-0.451-1.547-0.831-3.119-1.050-4.717-0.109-1.216-0.041-2.52 0.581-3.603 0.466-0.82 1.335-1.343 2.248-1.514 1.462-0.281 2.961 0.017 4.364 0.445-0.619 0.68-1.101 1.481-1.382 2.358-0.383 1.171-0.558 2.417-0.466 3.648 0.053 0.867 0.030 1.738-0.091 2.598-0.152 1.123 0.299 2.278 1.133 3.036-0.568 0.664-1.17 1.297-1.72 1.977zM11.814 16.158c-0.143-0.636 0.044-1.276 0.065-1.913 0.049-0.721-0.002-1.443-0.016-2.164 0.674-0.436 1.462-0.777 2.279-0.73 0.423 0.018 0.813 0.317 0.915 0.734 0.371 1.477 0.486 3.121-0.225 4.52-0.248 0.54-0.449 1.099-0.622 1.666-1.182 0.012-2.187-0.987-2.396-2.112zM15.492 20.112c-0.742 1.005-2.227 1.197-3.3 0.65 0.529-0.245 1.148-0.226 1.659-0.528 0.494-0.266 0.69-0.851 1.152-1.152 0.503-0.071 0.87 0.676 0.49 1.029zM21.856 18.938c-0.282 0.454-0.183 1.008-0.252 1.512-0.162 1.413-0.321 2.828-0.551 4.232-0.109 0.673-0.395 1.388-1.030 1.723-0.651 0.331-1.407 0.539-2.139 0.426-0.695-0.122-1.133-0.77-1.33-1.401-0.144-0.529-0.159-1.082-0.2-1.627-0.070-1.315-0.071-2.633-0.037-3.949 0.029-0.514-0.235-1.049-0.694-1.299-0.222-0.125-0.482-0.142-0.73-0.162 0.195-0.967 0.784-1.802 0.986-2.768 0.262-1.195 0.117-2.439-0.151-3.619-0.131-0.589-0.579-1.11-1.175-1.253-0.918-0.231-1.844 0.128-2.665 0.512 0.104-1.334 0.461-2.7 1.278-3.783 0.601-0.806 1.533-1.344 2.528-1.473 1.642-0.209 3.366 0.243 4.671 1.27 1.078 0.852 1.93 2.006 2.389 3.304-0.763-0.027-1.628-0.058-2.245 0.472-0.56 0.472-0.632 1.277-0.506 1.953 0.292 1.608 1.241 2.975 1.941 4.421 0.186 0.339 0.436 0.635 0.674 0.939-0.283 0.143-0.599 0.28-0.76 0.571zM23.82 20.075c-0.504 0.060-1.028 0.078-1.514-0.089 0.002-0.275-0.013-0.601 0.208-0.806 0.175-0.129 0.424-0.248 0.626-0.107 0.86 0.453 1.86 0.232 2.775 0.121-0.559 0.544-1.333 0.798-2.095 0.881zM21.178 11.728c-0.179 0.147 0.014 0.367 0.168 0.436 0.373 0.219 0.884-0.087 0.896-0.513-0.337-0.157-0.76-0.141-1.065 0.077zM14.576 12.408c0.159-0.090 0.327-0.337 0.143-0.486-0.262-0.213-0.643-0.254-0.962-0.168-0.103 0.036-0.211 0.106-0.19 0.232 0.074 0.428 0.647 0.688 1.008 0.422z"></path></svg>';
const WEB = (c: string, alive: boolean) => '<svg opacity="' + (alive ? 1 : 0.3) + '" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="white" stroke="' + c + '" d="M20.501 6.028V6h-.02A10.28 10.28 0 0 0 4.519 6H4.5v.028a10.262 10.262 0 0 0 0 12.944V19h.02a10.28 10.28 0 0 0 15.962 0h.021v-.028a10.262 10.262 0 0 0 0-12.944zM13 6V3.272A4.533 4.533 0 0 1 15.54 6zm2.935 1a16.827 16.827 0 0 1 .853 5H13V7zM12 3.272V6H9.46A4.533 4.533 0 0 1 12 3.272zM12 7v5H8.212a16.827 16.827 0 0 1 .853-5zm-4.787 5H3.226a9.234 9.234 0 0 1 1.792-5h2.984a17.952 17.952 0 0 0-.79 5zm0 1a17.952 17.952 0 0 0 .789 5H5.018a9.234 9.234 0 0 1-1.792-5zm1 0H12v5H9.065a16.827 16.827 0 0 1-.853-5zM12 19v2.728A4.533 4.533 0 0 1 9.46 19zm1 2.728V19h2.54A4.533 4.533 0 0 1 13 21.728zM13 18v-5h3.788a16.827 16.827 0 0 1-.853 5zm4.787-5h3.987a9.234 9.234 0 0 1-1.792 5h-2.984a17.952 17.952 0 0 0 .79-5zm0-1a17.952 17.952 0 0 0-.789-5h2.984a9.234 9.234 0 0 1 1.792 5zm1.352-6h-2.501a8.524 8.524 0 0 0-1.441-2.398A9.306 9.306 0 0 1 19.139 6zM9.803 3.602A8.524 8.524 0 0 0 8.363 6H5.86a9.306 9.306 0 0 1 3.942-2.398zM5.861 19h2.501a8.524 8.524 0 0 0 1.441 2.398A9.306 9.306 0 0 1 5.861 19zm9.336 2.398A8.524 8.524 0 0 0 16.637 19h2.502a9.306 9.306 0 0 1-3.942 2.398z"/></svg>';
const SERVER = (c: string, alive: boolean) => '<svg opacity="' + (alive ? 1 : 0.3) + '" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white" stroke="' + c + '" stroke-width="1" stroke-linecap="round" stroke-linejoin="miter"><rect x="2" y="14" width="20" height="8" rx="0"></rect><rect x="2" y="2" width="20" height="8" rx="0"></rect><line x1="18" y1="6" x2="16" y2="6"></line><line x1="18" y1="18" x2="16" y2="18"></line></svg>';

const GLOBAL_COLOR = "#FF0000";

const COLORS = [
  "purple",
  "blue",
  "green",
  "olive",
  "navy",
  "teal",
  "darkslateblue",
  "firebrick",
  "indigo",
];

const width = 900;
const height = 600;

/**
 * Quick and dirty network explorer
 * Can only be used by administrators
 * Generates a force directed graph of the current network
 * 
 * @returns 
 */
export function NetworkExplorer() {
  const userData = useUserDataRetriever();

  const [network, setNetwork] = useState<INetwork>(null);
  const [err, setErr] = useState<string>(null);
  const [loading, setLoading] = useState(true);

  const [pings, setPings] = useState<IPingsResult<IServerPingDataPing>>(null);
  const [pingsErr, setPingsErr] = useState<string>(null);
  const [loadingPings, setLoadingPings] = useState(true);

  const [adminKey, setAdminKey] = useState("");
  const [currentAdminResponse, setCurrentAdminResponse] = useState("");

  const updateAdminKey = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminKey(e.target.value);
  }, []);

  const [logs, setLogs] = useState<ILogsResult>(null);
  const [logsErr, setLogsErr] = useState<string>(null);
  const [loadingLogs, setLoadingLogs] = useState(true);

  const [currentNode, setCurrentNode] = useState<INetworkDbNode | INetworkServerNode>(null);

  const [useTimeOption, setUseTimeOption] = useState(-300000);
  const [useTimeCriteria, setUsageTimeCriteria] = useState({ from: null, to: null });
  const [logWindowOption, setLogWindowOption] = useState(-300000);
  const [useLogWindowCriteria, setLogWindowCriteria] = useState({ from: null, to: null, type: "any" });

  const [jsonUpdate, setJsonUpdate] = useState("");
  const [dictionary, setDictionary] = useState("simple");
  const [language, setLanguage] = useState("en");

  const updateJsonUpdate = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setJsonUpdate(e.target.value);
  }, []);
  const updateDictionary = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDictionary(e.target.value);
  }, []);
  const updateLanguage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(e.target.value);
  }, []);

  const rootInfo = useRootRetriever();

  const [id, setId] = useState("");
  const [version, setVersion] = useState("");

  const [executingAdminOperation, setExecutingAdminOperation] = useState(null as string);

  const updateId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, []);

  const updateVersion = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVersion(e.target.value);
  }, []);

  const deleteNode = useCallback(async () => {
    try {
      const rs = await fetch("/rest/admin/nodes/" + currentNode.nodeId, {
        method: "delete",
        credentials: "omit",
        headers: {
          'Token': userData.token,
          "adminkey": adminKey,
        },
      });
      if (rs.status !== 200) {
        try {
          const json = await rs.json();
          if (json.status) {
            alert(json.status);
          } else {
            alert("UNKNOWN_ERROR");
          }
        } catch (err) {
          console.warn(err);
          alert("UNKNOWN_ERROR");
        }
      } else {
        try {
          alert("SUCCESS");
          setCurrentNode(null);
          loadNetwork();
        } catch (err) {
          console.warn(err);
          alert("INVALID_SERVER_RESPONSE");
        }
      }
    } catch (err) {
      alert("NETWORK_ERROR");
    }
  }, [currentNode, adminKey]);

  const [selectablesIdef, selectablesElasticIdef] = useMemo(() => {
    const idefs: string[] = [];
    const idefsElastic: string[] = [];
    rootInfo.root.getAllModules().forEach((m) => m.getAllChildDefinitionsRecursive().forEach((v) => {
      idefs.push(v.getQualifiedPathName());
      if (v.isSearchEngineEnabled()) {
        idefsElastic.push(v.getQualifiedPathName());
      }
    }));
    return [idefs, idefsElastic];
  }, [rootInfo.root]);

  const [idef, setIdef] = useState(selectablesIdef[0] || "");
  const [eidef, setEidef] = useState(selectablesElasticIdef[0] || "");

  const rebuildIndex = useCallback(async (reindex: boolean) => {
    setExecutingAdminOperation(reindex ? "reindex" : "recheck");
    try {
      const rs = await fetch("/rest/admin/elastic/" + (reindex ? "reindex" : "recheck") + "/" + eidef, {
        method: "post",
        credentials: "omit",
        headers: {
          'Token': userData.token,
          "adminkey": adminKey,
        },
      });
      if (rs.status !== 200) {
        try {
          const json = await rs.json();
          if (json.status) {
            alert(json.status);
          } else {
            alert("UNKNOWN_ERROR");
          }
        } catch (err) {
          console.warn(err);
          alert("UNKNOWN_ERROR");
        }
      } else {
        try {
          alert("SUCCESS");
        } catch (err) {
          console.warn(err);
          alert("INVALID_SERVER_RESPONSE");
        }
      }
    } catch (err) {
      alert("NETWORK_ERROR");
    }
    setExecutingAdminOperation(null);
  }, [adminKey, eidef]);

  const updateIdef = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setIdef(e.target.value);
  }, []);

  const updateEidef = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setEidef(e.target.value);
  }, []);

  const forceDelete = useCallback(async () => {
    const confirm = prompt("Are you sure you want to delete this item y/n", "n");
    if (confirm !== "y") {
      return;
    }

    try {
      const rs = await fetch("/rest/admin/item/" + idef + "/" + id + "/" + (version || "_"), {
        credentials: "omit",
        method: "delete",
        headers: {
          'Token': userData.token,
          "adminkey": adminKey,
        },
      });
      if (rs.status !== 200) {
        try {
          const json = await rs.json();
          setCurrentAdminResponse(JSON.stringify(json, null, 2));
        } catch (err) {
          console.warn(err);
          setCurrentAdminResponse("INVALID_SERVER_RESPONSE");
        }
      } else {
        try {
          const json = await rs.json();
          setCurrentAdminResponse(JSON.stringify(json, null, 2));
        } catch (err) {
          console.warn(err);
          setCurrentAdminResponse("INVALID_SERVER_RESPONSE");
        }
      }
    } catch (err) {
      setCurrentAdminResponse("NETWORK_ERROR");
    }
  }, [adminKey, id, version, idef]);

  const forceUpdate = useCallback(async () => {
    let parsed: any = null;
    try {
      parsed = JSON.parse(jsonUpdate);
      const rs = await fetch("/rest/admin/item/" + idef + "/" + id + "/" + (version || "_"), {
        credentials: "omit",
        method: "put",
        headers: {
          'Token': userData.token,
          "adminkey": adminKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({update: parsed, dictionary, language}),
      });
      if (rs.status !== 200) {
        try {
          const json = await rs.json();
          setCurrentAdminResponse(JSON.stringify(json, null, 2));
        } catch (err) {
          console.warn(err);
          setCurrentAdminResponse("INVALID_SERVER_RESPONSE");
        }
      } else {
        try {
          const json = await rs.json();
          setCurrentAdminResponse(JSON.stringify(json, null, 2));
        } catch (err) {
          console.warn(err);
          setCurrentAdminResponse("INVALID_SERVER_RESPONSE");
        }
      }
    } catch (err) {
      setCurrentAdminResponse(!parsed ? "INVALID_JSON" : "NETWORK_ERROR");
    }
  }, [adminKey, id, version, idef, jsonUpdate, dictionary, language]);

  const retrieveItem = useCallback(async () => {
    try {
      const rs = await fetch("/rest/admin/item/" + idef + "/" + id + "/" + (version || "_"), {
        credentials: "omit",
        headers: {
          'Token': userData.token,
          "adminkey": adminKey,
        },
      });
      if (rs.status !== 200) {
        try {
          const json = await rs.json();
          setCurrentAdminResponse(JSON.stringify(json, null, 2));
        } catch (err) {
          console.warn(err);
          setCurrentAdminResponse("INVALID_SERVER_RESPONSE");
        }
      } else {
        try {
          const json = await rs.json();
          setCurrentAdminResponse(JSON.stringify(json, null, 2));
        } catch (err) {
          console.warn(err);
          setCurrentAdminResponse("INVALID_SERVER_RESPONSE");
        }
      }
    } catch (err) {
      setCurrentAdminResponse("NETWORK_ERROR");
    }
  }, [adminKey, id, version, idef]);

  const onChangeLogCriteriaType = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setLogWindowCriteria({
      ...useLogWindowCriteria,
      type: e.target.value,
    });
  }, [useLogWindowCriteria]);

  const onChangeUsageTime = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setUseTimeOption(value);
    const nodeIsDead = !(currentNode as INetworkServerNode).alive;
    if (nodeIsDead) {
      const lastHeard = (currentNode as INetworkServerNode).lastHeard;
      const lastHeardMs = new Date(lastHeard).getTime() + 1000;
      setUsageTimeCriteria({ from: lastHeardMs + useTimeOption, to: lastHeardMs });
    } else {
      setUsageTimeCriteria({ from: (new Date()).getTime() + useTimeOption, to: null });
    }
  }, [currentNode]);

  const moveUsageTimeLeft = useCallback(() => {
    setUsageTimeCriteria({
      from: useTimeCriteria.from + useTimeOption,
      to: useTimeCriteria.from,
    });
  }, [useTimeCriteria, useTimeOption]);

  const moveUsageTimeRight = useCallback(() => {
    let newTo = useTimeCriteria.to - useTimeOption;
    if (newTo >= (new Date()).getTime()) {
      newTo = null;
    }
    setUsageTimeCriteria({
      from: useTimeCriteria.to,
      to: newTo,
    });
  }, [useTimeCriteria, useTimeOption]);

  const onChangeLogWindowTime = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setLogWindowOption(value);
    const nodeIsDead = !(currentNode as INetworkServerNode).alive;
    if (nodeIsDead) {
      const lastHeard = (currentNode as INetworkServerNode).lastHeard;
      const lastHeardMs = new Date(lastHeard).getTime() + 1000;
      setLogWindowCriteria({ from: lastHeardMs + useTimeOption, to: lastHeardMs, type: useLogWindowCriteria.type });
    } else {
      setLogWindowCriteria({ from: (new Date()).getTime() + useTimeOption, to: null, type: useLogWindowCriteria.type });
    }
  }, [useLogWindowCriteria, currentNode]);

  const moveLogWindowLeft = useCallback(() => {
    setLogWindowCriteria({
      from: useLogWindowCriteria.from + logWindowOption,
      to: useLogWindowCriteria.from,
      type: useLogWindowCriteria.type,
    });
  }, [useLogWindowCriteria, logWindowOption]);

  const moveLogWindowRight = useCallback(() => {
    let newTo = useLogWindowCriteria.to - logWindowOption;
    if (newTo >= (new Date()).getTime()) {
      newTo = null;
    }
    setLogWindowCriteria({
      from: useLogWindowCriteria.to,
      to: newTo,
      type: useLogWindowCriteria.type,
    });
  }, [useLogWindowCriteria, logWindowOption]);

  const d3Ref = useRef<SVGSVGElement>();
  const d3CpuRef = useRef<SVGSVGElement>();
  const d3MemRef = useRef<SVGSVGElement>();
  const d3MemRef2 = useRef<SVGSVGElement>();

  const [d3loaded, setd3Loaded] = useState(false);

  const currentRenderedNetwork = useRef<INetwork>(null);
  const currentRenderedPings = useRef<IPingsResult<IServerPingDataPing>>(null);

  const [showDead, setShowDead] = useState(false);

  const toggleDead = useCallback(() => {
    setShowDead(!showDead);
    renderCurrentNetwork(!showDead);
  }, [showDead]);

  const loadNetwork = useCallback(async () => {
    setLoading(true);
    try {
      const rs = await fetch("/rest/admin/network", {
        credentials: "omit",
        headers: {
          'Token': userData.token,
        },
      });
      if (rs.status !== 200) {
        try {
          const json = await rs.json();
          if (json.status) {
            setErr(json.status);
            setLoading(false);
          } else {
            setErr("UNKNOWN_ERROR");
            setLoading(false);
          }
        } catch (err) {
          console.warn(err);
          setErr("UNKNOWN_ERROR");
          setLoading(false);
        }
      } else {
        try {
          const network: INetwork = await rs.json();
          setNetwork(network);
          setErr(null);
          setLoading(false);
        } catch (err) {
          console.warn(err);
          setErr("INVALID_SERVER_RESPONSE");
          setLoading(false);
        }
      }
    } catch (err) {
      setErr("NETWORK_ERROR");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNetwork();
    (async () => {
      await loadLib("D3CDN", "https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js", () => {
        return !!(window as any).d3;
      });
      setd3Loaded(true);
    })();
  }, []);

  const openInfoOn = useCallback((id: string) => {
    const nodeToOpen = currentRenderedNetwork.current.nodes.find((n) => n.nodeId === id);
    setUsageTimeCriteria({ from: null, to: null });
    setLogWindowCriteria({ from: null, to: null, type: "any" });
    setCurrentNode(nodeToOpen);
    if (nodeToOpen.nodeType === "server") {
      const nodeIsDead = !(nodeToOpen as INetworkServerNode).alive;
      if (nodeIsDead) {
        const lastHeard = nodeToOpen.lastHeard;
        const lastHeardMs = new Date(lastHeard).getTime() + 1000;
        setUsageTimeCriteria({ from: lastHeardMs + useTimeOption, to: lastHeardMs });
        setLogWindowCriteria({ from: lastHeardMs + logWindowOption, to: lastHeardMs, type: "any" });
      } else {
        setUsageTimeCriteria({ from: (new Date()).getTime() + useTimeOption, to: null });
        setLogWindowCriteria({ from: (new Date()).getTime() + logWindowOption, to: null, type: "any" });
      }
    }
  }, []);

  const renderPings = useCallback(() => {
    const pingsToRender = currentRenderedPings.current;

    const heightToUse = height / 2;
    const widthToUse = width - 48;

    const heightNoMargin = heightToUse - 80;
    const widthNoMargin = widthToUse - 80;

    const d3 = (window as any).d3;

    const x = d3.scaleTime()
      .domain(d3.extent(pingsToRender.pings, (d: ILogsRecord<IServerPingDataPing>) => { return new Date(d.createdAt) }))
      .range([0, widthNoMargin]);

    const svgCanvasEle = d3CpuRef.current;
    const svgCanvasEleMem = d3MemRef.current;
    const svgCanvasEleMem2 = d3MemRef2.current;

    let svg = d3.select(svgCanvasEle);
    svg.selectAll('*').remove();

    svg = svg.append("g").attr("transform", "translate(40,40)");

    let svgMem = d3.select(svgCanvasEleMem);
    svgMem.selectAll('*').remove();

    let svgMem2 = d3.select(svgCanvasEleMem2);
    svgMem2.selectAll('*').remove();

    svgMem = svgMem.append("g").attr("transform", "translate(40,40)");
    svgMem2 = svgMem2.append("g").attr("transform", "translate(40,40)");

    [svg, svgMem, svgMem2].forEach((svgobj) => {
      svgobj.append("g")
        .attr("transform", "translate(0," + heightNoMargin + ")")
        .call(d3.axisBottom(x));
    });

    const maxMem = (Math.max.apply(null, pingsToRender.pings.map((m) => Math.max(
      //m.data.freeMem,
      m.data.memoryUsage.arrayBuffers,
      m.data.memoryUsage.external,
      m.data.memoryUsage.heapUsed,
      m.data.memoryUsage.rss,
      m.data.memoryUsage.heapTotal,
    ))) / 1024) / 1024;

    const minMem = (Math.min.apply(null, pingsToRender.pings.map((m) => Math.min(
      //m.data.freeMem,
      m.data.memoryUsage.arrayBuffers,
      m.data.memoryUsage.external,
      m.data.memoryUsage.heapUsed,
      m.data.memoryUsage.rss,
      m.data.memoryUsage.heapTotal,
    ))) / 1024) / 1024;

    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([heightNoMargin, 0]);

    const yMem = d3.scaleLinear()
      .domain([minMem, maxMem])
      .range([heightNoMargin, 0]);

    const yMem2 = d3.scaleLinear()
      .domain(d3.extent(pingsToRender.pings, (d: ILogsRecord<IServerPingDataPing>) => { return (d.data.freeMem / 1024) / 1024 }))
      .range([heightNoMargin, 0]);

    svg.append("g")
      .call(d3.axisLeft(y));

    svgMem.append("g")
      .call(d3.axisLeft(yMem));

    svgMem2.append("g")
      .call(d3.axisLeft(yMem2));

    svg.append("path")
      .datum(pingsToRender.pings)
      .attr("fill", "none")
      .attr("stroke", "#7b1fa2")
      .attr("stroke-width", 1.5)
      .attr("opacity", 0.7)
      .attr("d", d3.line()
        .x((d: ILogsRecord<IServerPingDataPing>) => { return x(new Date(d.createdAt)) })
        .y((d: ILogsRecord<IServerPingDataPing>) => { return y(d.data.cpuPercent) })
      );
    // Add the points
    svg
      .append("g")
      .selectAll("dot")
      .data(pingsToRender.pings)
      .enter()
      .append("circle")
      .attr("cx", (d: ILogsRecord<IServerPingDataPing>) => { return x(new Date(d.createdAt)) })
      .attr("cy", (d: ILogsRecord<IServerPingDataPing>) => { return y(d.data.cpuPercent) })
      .attr("r", 5)
      .attr("fill", "#7b1fa2")
      .attr("opacity", 0.7);

    svg.append("path")
      .datum(pingsToRender.pings)
      .attr("fill", "none")
      .attr("stroke", "#f57c00")
      .attr("stroke-width", 1.5)
      .attr("opacity", 0.7)
      .attr("d", d3.line()
        .x((d: ILogsRecord<IServerPingDataPing>) => { return x(new Date(d.createdAt)) })
        .y((d: ILogsRecord<IServerPingDataPing>) => { return y(d.data.loadAvg60) })
      );

    svg
      .append("g")
      .selectAll("dot")
      .data(pingsToRender.pings)
      .enter()
      .append("circle")
      .attr("cx", (d: ILogsRecord<IServerPingDataPing>) => { return x(new Date(d.createdAt)) })
      .attr("cy", (d: ILogsRecord<IServerPingDataPing>) => { return y(d.data.loadAvg60) })
      .attr("r", 5)
      .attr("fill", "#f57c00")
      .attr("opacity", 0.7);

    [
      ["#000", "freeMem", svgMem2, yMem2],
      ["#d32f2f", "arrayBuffers", svgMem, yMem],
      ["#00796b", "heapUsed", svgMem, yMem],
      ["#0097a7", "heapTotal", svgMem, yMem],
      ["#303f9f", "external", svgMem, yMem],
      ["#6d4c41", "rss", svgMem, yMem]
    ].forEach((v) => {
      v[2].append("path")
        .datum(pingsToRender.pings)
        .attr("fill", "none")
        .attr("stroke", v[0])
        .attr("stroke-width", 1.5)
        .attr("opacity", 0.7)
        .attr("d", d3.line()
          .x((d: ILogsRecord<IServerPingDataPing>) => { return x(new Date(d.createdAt)) })
          .y((d: ILogsRecord<IServerPingDataPing>) => { return v[3](((d.data[v[1]] || d.data.memoryUsage[v[1]] || 0) / 1024) / 1024) })
        );
      // Add the points
      v[2]
        .append("g")
        .selectAll("dot")
        .data(pingsToRender.pings)
        .enter()
        .append("circle")
        .attr("cx", (d: ILogsRecord<IServerPingDataPing>) => { return x(new Date(d.createdAt)) })
        .attr("cy", (d: ILogsRecord<IServerPingDataPing>) => { return v[3](((d.data[v[1]] || d.data.memoryUsage[v[1]] || 0) / 1024) / 1024) })
        .attr("r", 5)
        .attr("fill", v[0])
        .attr("opacity", 0.7);
    });
  }, []);

  const renderCurrentNetwork = useCallback((wdead: boolean) => {
    const networkToRender = currentRenderedNetwork.current;

    const allGroups: string[] = [];
    networkToRender.nodes.forEach((v) => {
      if (!allGroups.includes(v.groupId)) {
        allGroups.push(v.groupId);
      }
    });

    allGroups.sort();
    const allGroupsColor: { [groupId: string]: string } = {};
    allGroups.forEach((gId, index) => {
      allGroupsColor[gId] = gId === "GLOBAL" ? GLOBAL_COLOR : COLORS[index % COLORS.length];
    });

    const nodes: ID3Node[] = [];
    const links: ID3Link[] = [];

    networkToRender.nodes.forEach((n) => {
      const alive = typeof (n as INetworkServerNode).alive === "boolean" ? (n as INetworkServerNode).alive : true;

      if (!alive && !wdead) {
        return;
      }

      const nodeColor = allGroupsColor[n.groupId];
      nodes.push({
        id: n.nodeId,
        group: n.groupId,
        name: n.name,
        icon: ((n as INetworkDbNode).type === "elastic" ? ELASTIC(nodeColor, alive) : (
          (n as INetworkDbNode).type === "pg" ? PG(nodeColor, alive) : (
            (n as INetworkDbNode).type === "redis" ? REDIS(nodeColor, alive) : (
              (n as INetworkServerNode).type === "extended" ? WEB(nodeColor, alive) : SERVER(nodeColor, alive)
            )
          )
        )),
        color: nodeColor,
        alive,
      });

      if ((n as INetworkDbNode).type !== "elastic" && (n as INetworkDbNode).type !== "pg" && (n as INetworkDbNode).type !== "redis") {
        n.links.forEach((l) => {
          links.push({
            source: n.nodeId,
            target: l.id,
            // global manager and global database and elasticsearch
            // anything cluster tighter together
            value: (l.type.includes("global") || l.type.includes("search")) ? 1 : 2,
            alive,
          });
        });
      }
    });

    const d3 = (window as any).d3;
    const svgCanvasEle = d3Ref.current;

    const svg = d3.select(svgCanvasEle);

    svg.selectAll('*').remove();

    const simulation = d3.forceSimulation(nodes)
      .force("link",
        d3.forceLink(links)
          .id((d: any) => d.id)
          .distance((d: ID3Link) => d.value * 20)
          .strength((d: ID3Link) => d.value / 200)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);

    const link = svg.append("g")
      .attr("stroke", "#000")
      .selectAll()
      .data(links)
      .join("line")
      .attr("stroke-opacity", (l: ID3Link) => l.alive ? 0.8 : 0.4)
      .attr("stroke-width", (d: ID3Link) => d.value)
      .attr("stroke-dasharray", (d: ID3Link) => d.alive ? "1" : "10,10")

    const node = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-width", 1.5)
      .selectAll()
      .data(nodes)
      .enter().append('g').attr("style", "cursor:pointer");

    node.on("click", expandNode);

    node.each(function (d: any) {
      const icon = new DOMParser().parseFromString(d.icon, 'image/svg+xml').documentElement;
      d3.select(this).node().appendChild(icon);
    });

    node.append("title")
      .text((d: ID3Node) => d.name);

    // Add a drag behavior.
    node.call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

    simulation
      .nodes(nodes)
      .on('tick', ticked);

    simulation.force('link')
      .links(links);

    function ticked() {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => "translate(" + (d.x - 15) + "," + (d.y - 15) + ")");
    }

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any, d) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    function expandNode(event: any, d) {
      openInfoOn(d.id);
    }
  }, []);

  useEffect(() => {
    if (d3loaded && currentRenderedNetwork.current !== network) {
      currentRenderedNetwork.current = network;
      renderCurrentNetwork(showDead);
    }
  }, [d3loaded, network]);

  useEffect(() => {
    if (d3loaded && currentRenderedPings.current !== pings) {
      currentRenderedPings.current = pings;
      if (pings) {
        renderPings();
      }
    }
  }, [d3loaded, pings]);


  useEffect(() => {
    if (currentNode?.nodeType === "server" && useTimeCriteria.from) {
      (async () => {
        setLoadingPings(true);
        try {
          const rs = await fetch("/rest/admin/nodes/" + currentNode.nodeId +
            "/pings/ping_data?from=" + useTimeCriteria.from + "&to=" + (useTimeCriteria.to || ""), {
            credentials: "omit",
            headers: {
              'Token': userData.token,
            },
          });
          if (rs.status !== 200) {
            try {
              const json = await rs.json();
              if (json.status) {
                setPingsErr(json.status);
                setLoadingPings(false);
              } else {
                setPingsErr("UNKNOWN_ERROR");
                setLoadingPings(false);
              }
            } catch (err) {
              console.warn(err);
              setPingsErr("UNKNOWN_ERROR");
              setLoadingPings(false);
            }
          } else {
            try {
              const pings: { pings: IPingsResult<IServerPingDataPing> } = await rs.json();
              setPings(pings.pings);
              setPingsErr(null);
              setLoadingPings(false);
            } catch (err) {
              console.warn(err);
              setPingsErr("INVALID_SERVER_RESPONSE");
              setLoadingPings(false);
            }
          }
        } catch (err) {
          setPingsErr("NETWORK_ERROR");
          setLoadingPings(false);
        }
      })();
    }
  }, [useTimeCriteria, currentNode]);

  useEffect(() => {
    if (currentNode?.nodeType === "server" && useLogWindowCriteria.from) {
      (async () => {
        setLoadingLogs(true);
        try {
          const rs = await fetch("/rest/admin/nodes/" + currentNode.nodeId + "/logs/" + useLogWindowCriteria.type +
            "?from=" + useLogWindowCriteria.from + "&to=" + (useLogWindowCriteria.to || ""), {
            credentials: "omit",
            headers: {
              'Token': userData.token,
            },
          });
          if (rs.status !== 200) {
            try {
              const json = await rs.json();
              if (json.status) {
                setLogsErr(json.status);
                setLoadingLogs(false);
              } else {
                setLogsErr("UNKNOWN_ERROR");
                setLoadingLogs(false);
              }
            } catch (err) {
              console.warn(err);
              setLogsErr("UNKNOWN_ERROR");
              setLoadingLogs(false);
            }
          } else {
            try {
              const logs: { logs: ILogsResult } = await rs.json();
              setLogs(logs.logs);
              setLogsErr(null);
              setLoadingLogs(false);
            } catch (err) {
              console.warn(err);
              setLogsErr("INVALID_SERVER_RESPONSE");
              setLoadingLogs(false);
            }
          }
        } catch (err) {
          setLogsErr("NETWORK_ERROR");
          setLoadingLogs(false);
        }
      })();
    }
  }, [useLogWindowCriteria, currentNode]);

  const lastHeardDate = currentNode && (new Date((currentNode as INetworkServerNode).lastHeard));
  const createdAtDate = currentNode && (new Date((currentNode as INetworkServerNode).createdAt));

  return (
    <div>
      <div style={{ margin: "1rem", fontSize: "24px" }}>
        {!d3loaded ? "Loading D3 please wait..." : (loading ? "Loading network please wait..." : (err ? "ERR: " + err : "Admin Node Explorer"))}
      </div>
      <div style={{ margin: "1rem" }}>
        <button style={{
          marginRight: '1rem',
          padding: '0.5rem 1rem',
          fontSize: '1rem'
        }}
          onClick={loadNetwork} disabled={loading}>reload</button>
        <button style={{
          marginRight: '1rem',
          padding: '0.5rem 1rem',
          fontSize: '1rem'
        }}
          onClick={toggleDead} disabled={loading}>{showDead ? "hide dead" : "show dead"}</button>
      </div>
      <div style={{ margin: "1rem" }}>
        <svg
          width={width}
          height={height}
          ref={d3Ref}
          viewBox={([0, 0, width, height]).join(" ")}
          style={{ border: "solid 2px" }}
        ></svg>
      </div>
      {currentNode ? <div style={{ width, padding: "1rem", border: "solid 2px", background: "aliceblue", margin: "1rem" }}>
        <div style={{
          marginBottom: '1rem',
          fontSize: '18px',
          fontWeight: '600'
        }}>{currentNode.name} - {currentNode.nodeId} [{currentNode.groupId}]</div>
        {
          (currentNode as INetworkDbNode).host ?
            <div>HOST: {(currentNode as INetworkDbNode).host}
            </div> :
            null
        }
        {
          (currentNode as INetworkServerNode).type ?
            <div>TYPE: {(currentNode as INetworkServerNode).type}
            </div> :
            null
        }
        {
          typeof (currentNode as INetworkServerNode).alive === "boolean" ?
            <div>STATUS: {(currentNode as INetworkServerNode).alive ? " RUNNING" : " DEAD"}
            </div> :
            null
        }
        {
          (currentNode as INetworkServerNode).lastHeard ?
            <div>
              LAST HEARD: {lastHeardDate.toLocaleDateString()} {lastHeardDate.toLocaleTimeString()}
            </div> :
            null
        }
        {
          (currentNode as INetworkServerNode).createdAt ?
            <div>
              SPAWNED AT: {createdAtDate.toLocaleDateString()} {createdAtDate.toLocaleTimeString()}
            </div> :
            null
        }
        {
          (currentNode as INetworkServerNode).envData ?
            <div style={{ marginTop: "1rem" }}>
              <div><b>ENV</b></div>
              <table>
                <tbody>
                  {Object.keys((currentNode as INetworkServerNode).envData).map((k) => {
                    return (
                      <tr key={k}>
                        <td>{k}</td>
                        <td>{JSON.stringify((currentNode as INetworkServerNode).envData[k])}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div> :
            null
        }
        {
          currentNode.links.length ?
            <div style={{ marginTop: "1rem" }}>
              <div><b>LINKS</b></div>
              <table>
                <tbody>
                  {currentNode.links.map((k, i) => {
                    const nodeInQuestion = currentRenderedNetwork.current.nodes.find((n) => n.nodeId === k.id);
                    const isDead = nodeInQuestion.nodeType === "server" && !(nodeInQuestion as INetworkServerNode).alive;
                    if (isDead && !showDead) {
                      return null;
                    }
                    return (
                      <tr key={i}>
                        <td>{k.type}</td>
                        <td style={{ cursor: "pointer", color: "blue" }} onClick={openInfoOn.bind(null, k.id)}>{k.id}</td>
                        <td>{isDead ? "DEAD" : "RUNNING"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div> :
            null
        }
      </div> : null}
      {currentNode ? <div style={{ width, padding: "1rem", border: "solid 2px", background: "aliceblue", margin: "1rem" }}>
        <div style={{
          marginBottom: '1rem',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          Administrative actions on the node
        </div>
        {currentNode.nodeType === "server" ? <div>
          <a
            href={"/rest/admin/nodes/" + currentNode.nodeId + "/logfile?token=" + encodeURIComponent(userData.token)}
            download={currentNode.nodeId + ".logs.txt"}
          >
            <button>Donwload logs</button>
          </a>
          <a
            href={"/rest/admin/nodes/" + currentNode.nodeId + "/pingfile/ping_data?token=" + encodeURIComponent(userData.token)}
            download={currentNode.nodeId + ".pings.txt"}
          >
            <button>Donwload ping data</button>
          </a>
          {currentNode.alive ? null : (
            <>
              <input type="text" placeholder="administrative key" onChange={updateAdminKey} value={adminKey} />
              <button onClick={deleteNode}>
                delete node
              </button>
            </>
          )}
        </div> : (
          currentNode.nodeType === "database" ? (
            (currentNode as INetworkDbNode).type === "elastic" && (currentNode as INetworkDbNode).links.some((l) => l.type === "uses-as-search-database") ? (
              <div>
                <input type="text" placeholder="administrative key" onChange={updateAdminKey} value={adminKey} />
                <select value={eidef} onChange={updateEidef}>
                  {selectablesElasticIdef.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
                <button
                  disabled={!!executingAdminOperation}
                  onClick={rebuildIndex.bind(null, true)}
                >
                  {executingAdminOperation === "reindex" ? "Executing..." : "Rebuild index"}
                </button>
                <button
                  disabled={!!executingAdminOperation}
                  onClick={rebuildIndex.bind(null, false)}
                >
                  {executingAdminOperation === "recheck" ? "Executing..." : "Run consistency check"}
                </button>
              </div>
            ) : ((currentNode as INetworkDbNode).type === "pg" ? (
              <>
                <div>
                  <input type="text" placeholder="administrative key" onChange={updateAdminKey} value={adminKey} />
                  <select value={idef} onChange={updateIdef}>
                    {selectablesIdef.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                  <input type="text" placeholder="item id" value={id} onChange={updateId} />
                  <input type="text" placeholder="item version" value={version} onChange={updateVersion} />
                  <hr></hr>
                  <button onClick={retrieveItem}>Fetch item</button>
                  <hr></hr>
                  <button onClick={forceDelete}>Force delete item (ignores triggers)</button>
                  <hr></hr>
                  <input type="text" placeholder="json based update" value={jsonUpdate} onChange={updateJsonUpdate} />
                  <input type="text" placeholder="dictionary" value={dictionary} onChange={updateDictionary} />
                  <input type="text" placeholder="language" value={language} onChange={updateLanguage} />
                  <button onClick={forceUpdate}>Force update item (ignores triggers)</button>
                </div>
                <code>
                  {currentAdminResponse}
                </code>
              </>
            ) : null)
          ) : null
        )}
      </div> : null}
      {currentNode && currentNode.nodeType === "server" ? <div style={{ width, padding: "1rem", border: "solid 2px", background: "aliceblue", margin: "1rem" }}>
        <div style={{
          marginBottom: '1rem',
          fontSize: '18px',
          fontWeight: '600'
        }}>MEMORY AND CPU USAGE {loadingPings ? "(Loading please wait...)" : (pingsErr ? "(" + pingsErr + ")" : "")}</div>
        <div>
          <select value={useTimeOption} onChange={onChangeUsageTime}>
            <option value={-300000}>{currentNode.alive ? "last 5 minutes from now" : "last 5 living minutes"}</option>
            <option value={-600000}>{currentNode.alive ? "last 10 minutes from now" : "last 10 living minutes"}</option>
            <option value={-1200000}>{currentNode.alive ? "last 20 minutes from now" : "last 20 living minutes"}</option>
            <option value={-1800000}>{currentNode.alive ? "last 30 minutes from now" : "last 30 living minutes"}</option>
          </select>
          {useTimeCriteria.from && useTimeCriteria.from > (new Date(currentNode.createdAt)).getTime() ? <button onClick={moveUsageTimeLeft}>
            prev
          </button> : null}
          {useTimeCriteria.to === null || (!currentNode.alive && (new Date(currentNode.lastHeard)).getTime() < useTimeCriteria.to) ? null : (
            <button onClick={moveUsageTimeRight}>
              next
            </button>
          )}
        </div>
        {useTimeCriteria.from ? <div>
          viewing logs from {(new Date(useTimeCriteria.from)).toLocaleDateString()} {(new Date(useTimeCriteria.from)).toLocaleTimeString()}-{useTimeCriteria.to ?
            ((new Date(useTimeCriteria.to)).toLocaleDateString() + " " + (new Date(useTimeCriteria.to)).toLocaleTimeString()) : "now"}
        </div> : null}
        <div style={{ marginBottom: "1rem" }}>
          <div style={{ marginTop: "20px" }}>CPU usage</div>
          <div style={{ fontSize: "10px" }}><div style={{ display: "inline-block", width: "10px", height: "10px", background: "#7b1fa2" }}></div> CPU process load</div>
          <div style={{ fontSize: "10px" }}><div style={{ display: "inline-block", width: "10px", height: "10px", background: "#f57c00" }}></div> 60 second entire CPU average load</div>
        </div>
        <svg
          width={width - 48}
          height={height / 2}
          ref={d3CpuRef}
          viewBox={([0, 0, width - 48, height / 2]).join(" ")}
          style={{ border: "solid 2px" }}
        ></svg>
        <div style={{ marginBottom: "1rem" }}>
          <div style={{ marginTop: "20px" }}>Memory usage</div>
          <div style={{ fontSize: "10px" }}><div style={{ display: "inline-block", width: "10px", height: "10px", background: "#d32f2f" }}></div> Process array buffers memory (MB)</div>
          <div style={{ fontSize: "10px" }}><div style={{ display: "inline-block", width: "10px", height: "10px", background: "#00796b" }}></div> Process heap used (MB)</div>
          <div style={{ fontSize: "10px" }}><div style={{ display: "inline-block", width: "10px", height: "10px", background: "#0097a7" }}></div> Process heap total (MB)</div>
          <div style={{ fontSize: "10px" }}><div style={{ display: "inline-block", width: "10px", height: "10px", background: "#303f9f" }}></div> Process external usage (MB)</div>
          <div style={{ fontSize: "10px" }}><div style={{ display: "inline-block", width: "10px", height: "10px", background: "#6d4c41" }}></div> Process RSS (MB)</div>
        </div>
        <svg
          width={width - 48}
          height={height / 2}
          ref={d3MemRef}
          viewBox={([0, 0, width - 48, height / 2]).join(" ")}
          style={{ border: "solid 2px" }}
        ></svg>
        <div style={{ marginBottom: "1rem" }}>
          <div style={{ marginTop: "20px" }}>Free memory</div>
          <div style={{ fontSize: "10px" }}><div style={{ display: "inline-block", width: "10px", height: "10px", background: "#000" }}></div> Total free memory (MB)</div>
        </div>
        <svg
          width={width - 48}
          height={height / 2}
          ref={d3MemRef2}
          viewBox={([0, 0, width - 48, height / 2]).join(" ")}
          style={{ border: "solid 2px" }}
        ></svg>
      </div> : null}

      {currentNode && currentNode.nodeType === "server" ? <div style={{ width, padding: "1rem", border: "solid 2px", background: "aliceblue", margin: "1rem" }}>
        <div style={{
          marginBottom: '1rem',
          fontSize: '18px',
          fontWeight: '600'
        }}>LOGS  {loadingLogs ? "(Loading please wait...)" : (logsErr ? "(" + logsErr + ")" : "")}</div>
        <div style={{ marginBottom: "1rem" }}>
          <select value={logWindowOption} onChange={onChangeLogWindowTime}>
            <option value={-300000}>{currentNode.alive ? "last 5 minutes from now" : "last 5 living minutes"}</option>
            <option value={-600000}>{currentNode.alive ? "last 10 minutes from now" : "last 10 living minutes"}</option>
            <option value={-1200000}>{currentNode.alive ? "last 20 minutes from now" : "last 20 living minutes"}</option>
            <option value={-1800000}>{currentNode.alive ? "last 30 minutes from now" : "last 30 living minutes"}</option>
          </select>
          <select value={useLogWindowCriteria.type} onChange={onChangeLogCriteriaType}>
            <option value="any">any</option>
            <option value="error">errors</option>
            <option value="info">info</option>
          </select>
          {useLogWindowCriteria.from && useLogWindowCriteria.from > (new Date(currentNode.createdAt)).getTime() ? <button onClick={moveLogWindowLeft}>
            prev
          </button> : null}
          {useLogWindowCriteria.to === null || (!currentNode.alive && (new Date(currentNode.lastHeard)).getTime() < useLogWindowCriteria.to) ? null : (
            <button onClick={moveLogWindowRight}>
              next
            </button>
          )}
        </div>
        {logs ? <div style={{ marginBottom: "1rem" }}>
          <div style={{ marginTop: "20px" }}>{logs.level.toUpperCase() + " logs (oldest first)"}</div>
        </div> : null}
        {useLogWindowCriteria.from ? <div>
          viewing logs from {(new Date(useLogWindowCriteria.from)).toLocaleDateString()} {(new Date(useLogWindowCriteria.from)).toLocaleTimeString()}-{useLogWindowCriteria.to ?
            ((new Date(useLogWindowCriteria.to)).toLocaleDateString() + " " + (new Date(useLogWindowCriteria.to)).toLocaleTimeString()) : "now"}
        </div> : null}
        <div>
          {logs && logs.records.map((r, i) => {
            const timeDate = new Date(r.createdAt);
            return (
              <div
                key={i}
                style={
                  {
                    background: r.level === "info" ? "#81d4fa" : (r.level === "error" && !r.data.serious ? "#ffcc80" : "#f44336"),
                    borderBottom: "solid 2px " + (r.level === "info" ? "#0d47a1" : (r.level === "error" && !r.data.serious ? "#e65100" : "#b71c1c")),
                  }
                }
              >
                {r.data.orphan ? (
                  <div>
                    ORPHAN
                  </div>
                ) : null}
                {r.data.className || r.data.methodName || r.data.endpoint || r.data.functionName ? <div>
                  {r.data.className ? <div style={{ border: "solid 2px #444", padding: "0.5rem 1rem", marginRight: "1rem", display: "inline-block" }}>
                    <i>class: </i>
                    <b>{r.data.className}</b>
                  </div> : null}
                  {r.data.methodName ? <div style={{ border: "solid 2px #444", padding: "0.5rem 1rem", marginRight: "1rem", display: "inline-block" }}>
                    <i>method: </i>
                    <b>.{r.data.methodName}(...)</b>
                  </div> : null}
                  {r.data.functionName ? <div style={{ border: "solid 2px #444", padding: "0.5rem 1rem", marginRight: "1rem", display: "inline-block" }}>
                    <i>function: </i>
                    <b>{r.data.functionName}(...)</b>
                  </div> : null}
                  {r.data.endpoint ? <div style={{ border: "solid 2px #444", padding: "0.5rem 1rem", marginRight: "1rem", display: "inline-block" }}>
                    <i>endpoint: </i>
                    <b>{r.data.endpoint}</b>
                  </div> : null}
                </div> : null}
                {r.data.message ? <div>{r.data.message}</div> : null}
                {r.data.errMessage ? <div><b>{r.data.errMessage}</b></div> : null}
                {r.data.errStack ? <div><code>{r.data.errStack}</code></div> : null}
                <div>
                  {timeDate.toLocaleDateString()} {timeDate.toLocaleTimeString()}
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}
    </div>
  );
}