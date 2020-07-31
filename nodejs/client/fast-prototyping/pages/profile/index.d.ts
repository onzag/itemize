/**
 * The user profile that is as seen by the public
 *
 * @packageDocumentation
 */
/// <reference types="react" />
/**
 * The profile props
 */
interface ProfileProps {
    match: {
        params: {
            id: string;
        };
    };
}
/**
 * Represents a public user profile component
 * that displays basic information about a public user
 *
 * @param props the profile props
 * @returns a react element
 */
export declare function Profile(props: ProfileProps): JSX.Element;
export {};
