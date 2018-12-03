/**
 * @author Adam (charrondev) Charron <adam.c@vanillaforums.com>
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import * as React from "react";
import { Omit } from "@library/@types/utils";
import { ISearchOptionData } from "@library/components/search/SearchOption";
import { IComboBoxOption } from "@library/components/forms/select/SearchBar";
const PageContext = React.createContext<IWithPagesProps>({ pages: {} });
export default PageContext;

export interface IPageProvider {
    autocomplete(query: string): Promise<Array<IComboBoxOption<ISearchOptionData>>>;
    makeSearchUrl(query: string): string;
}

interface IPageLoader {
    preload(): void;
    url(data?: undefined): string;
}

export interface IWithPagesProps {
    pages: {
        search?: IPageLoader;
        drafts?: IPageLoader;
    };
}

/**
 * HOC to inject API context
 *
 * @param WrappedComponent - The component to wrap
 */
export function withPages<T extends IWithPagesProps = IWithPagesProps>(WrappedComponent: React.ComponentType<T>) {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";
    class ComponentWithDevice extends React.Component<Omit<T, keyof IWithPagesProps>> {
        public static displayName = `withPages(${displayName})`;
        public render() {
            return (
                <PageContext.Consumer>
                    {context => {
                        return <WrappedComponent {...context} {...this.props} />;
                    }}
                </PageContext.Consumer>
            );
        }
    }
    return ComponentWithDevice;
}
