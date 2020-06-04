import React from "react";
import { WithStyles } from "@material-ui/core";
declare const heroStyle: {
    heroContainer: {
        display: string;
        alignItems: string;
        justifyContent: string;
        flexDirection: "column";
        width: string;
        height: string;
        borderBottom: string;
    };
};
interface HeroProps extends WithStyles<typeof heroStyle> {
    heroID: number;
}
export declare const Hero: React.ComponentType<Pick<HeroProps, "heroID"> & import("@material-ui/core").StyledComponentProps<"heroContainer">>;
export {};
