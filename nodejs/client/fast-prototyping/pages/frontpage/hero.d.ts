import React from "react";
import { WithStyles } from "../../mui-core";
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
export declare const Hero: React.ComponentType<Pick<HeroProps, "heroID"> & import("@material-ui/styles").StyledComponentProps<"heroContainer">>;
export {};
