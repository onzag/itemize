import { IPropertyDefinitionSupportedLocationType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/location";
import { EndpointErrorType } from "../../../base/errors";
import React, { useCallback, useEffect, useRef, useState } from "react";
import uuid from "uuid";
import { useAppLanguageRetriever } from "../localization/AppLanguageRetriever";
import { useRootRetriever } from "../root/RootRetriever";
import { ENDPOINT_ERRORS } from "../../../constants";

interface ICurrentLocationReaderInfo {
  geocodeLanguage?: string;
  watch?: boolean;
  useGeocode?: boolean;
  options?: PositionOptions;
  disabled?: boolean;
}

interface ICurrentLocationDetails {
  currentLocation: IPropertyDefinitionSupportedLocationType;
  currentLocationRaw: GeolocationPosition;
  finding: boolean;
  geocoding: boolean;
  userRejected: boolean;
  timedout: boolean;
  notSupported: boolean;
  failed: boolean;
  err: EndpointErrorType;
  disabled: boolean;
  dismissError: () => void;
  dismissUserRejected: () => void;
  dismissTimedOut: () => void;
  dismissNotSupported: () => void;
  dismissFailed: () => void;
}

interface ICurrentLocationProps extends ICurrentLocationReaderInfo {
  children: (info: ICurrentLocationDetails) => React.ReactNode;
}

export function useCurrentLocationReader(props: ICurrentLocationReaderInfo = {}): ICurrentLocationDetails {
  const langInfo = useAppLanguageRetriever();
  const root = useRootRetriever();
  const sep = root.root.getI18nDataFor(langInfo.currentLanguage.code).word_separator;

  const [currentLocation, setCurrentLocation] = useState(null as IPropertyDefinitionSupportedLocationType);
  const [currentLocationRaw, setCurrentLocationRaw] = useState(null as GeolocationPosition);
  const [finding, setFinding] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [notSupported, setNotSupported] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [timedout, setTimedOut] = useState(false);
  const [failed, setFailed] = useState(false);
  const [err, setErr] = useState(null as EndpointErrorType);

  // because in order to keep the success callback updated
  // with this we need to know, and whatever value
  // gets added is used in the use effect as the callback function
  // which means as prop it wouldn't get updated
  // but as ref it will pass through
  const usesGeocodeRef = useRef(props.useGeocode);
  usesGeocodeRef.current = props.useGeocode;

  const dismissError = useCallback(() => {
    setErr(null);
  }, []);

  const dismissUserRejected = useCallback(() => {
    setRejected(false);
  }, []);

  const dismissTimedOut = useCallback(() => {
    setTimedOut(false);
  }, []);

  const dismissNotSupported = useCallback(() => {
    setNotSupported(false);
  }, []);

  const dismissFailed = useCallback(() => {
    setFailed(false);
  }, []);

  const onSuccessCallback = useCallback(async (position: GeolocationPosition) => {
    setFinding(false);
    setCurrentLocationRaw(position);

    if (usesGeocodeRef.current) {
      setGeocoding(true);

      try {
        const rs = await fetch(`/rest/util/location-geocode?lat=${position.coords.latitude}&lng=${position.coords.longitude}` +
          `&sep=${encodeURIComponent(sep)}&lang=${langInfo.currentLanguage.code}`);

        if (rs.status === 200) {
          const result = await rs.json();
          setCurrentLocation(result);
        } else if (rs.status === 400) {
          const err = await rs.json();
          setErr(err);
        }
      } catch {
        setErr({
          code: ENDPOINT_ERRORS.CANT_CONNECT,
          message: "Could not connect to geocoding",
        });
      }

      setGeocoding(false);
    } else {
      setCurrentLocation({
        atxt: "???",
        txt: "???",
        id: "U" + uuid.v4().replace(/-/g, ""),
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }
  }, []);

  const onErrorCallback = useCallback((err: GeolocationPositionError) => {
    setFinding(false);
    if (err.code === 1) {
      setRejected(true);
    } else if (err.code === 2) {
      setTimedOut(true);
    } else {
      setFailed(true);
    }
  }, []);

  useEffect(() => {
    setCurrentLocation(null);
    setCurrentLocationRaw(null);

    if (props.disabled) {
      return;
    }

    if (!navigator.geolocation) {
      setNotSupported(true);
    } else if (!props.watch) {
      setFinding(true);
      navigator.geolocation.getCurrentPosition(onSuccessCallback, onErrorCallback, props.options);
    } else {
      const watchN = navigator.geolocation.watchPosition(onSuccessCallback, onErrorCallback, props.options);

      return () => {
        navigator.geolocation.clearWatch(watchN);
      }
    }
  }, [props.watch, props.options, props.disabled]);

  return (
    {
      currentLocation,
      currentLocationRaw,
      dismissError,
      dismissFailed,
      dismissNotSupported,
      dismissTimedOut,
      dismissUserRejected,
      err,
      failed,
      finding,
      geocoding,
      notSupported,
      timedout,
      disabled: !!props.disabled,
      userRejected: rejected,
    }
  );
}

export default function CurrentLocationReader(props: ICurrentLocationProps) {
  const info = useCurrentLocationReader(props);

  return props.children(info);
}