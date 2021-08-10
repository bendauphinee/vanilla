/**
 * @author Dominic Lacaille <dominic.lacaille@vanillaforums.com>
 * @copyright 2009-2021 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import { css } from "@emotion/css";
import Axios from "axios";
import React, { useState } from "react";
import { labelize } from "@vanilla/utils";
import { FormGroup, FormGroupLabel, FormGroupInput } from "../../index";
import { AutoCompleteOption, AutoComplete as UIAutoComplete, AutoCompleteLookupOptions, ILookupApi } from "./";
import * as Reach from "@reach/combobox";

export default {
    title: "Vanilla UI/Forms",
};

const storyStyle = css({
    display: "grid",
    gridTemplateColumns: "300px 200px",
    gridTemplateRows: "30px repeat(9, auto)",
    alignItems: "center",
    columnGap: 32,
    rowGap: 16,
    gridAutoFlow: "column",

    h3: { borderBottom: "1px solid #ddd", paddingBottom: 8 },
    h4: { margin: "8px 0" },
});

interface StoryAutoCompleteProps extends React.ComponentProps<typeof UIAutoComplete> {
    label?: string;
}

function StoryAutoComplete(props: StoryAutoCompleteProps) {
    const { label, ...autoCompleteProps } = props;
    const defaultValue = props.hasOwnProperty("value") ? props.value : 1;
    console.log(defaultValue);
    const [value, setValue] = useState<any | any[] | undefined>(defaultValue);
    const setDataValue = (values) => {
        setValue(Array.isArray(values) ? [...values] : values);
    };
    return (
        <>
            <FormGroup>
                <FormGroupLabel>{label}</FormGroupLabel>
                <FormGroupInput>
                    {(props) => (
                        <UIAutoComplete {...autoCompleteProps} {...props} value={value} onChange={setDataValue}>
                            <AutoCompleteOption value={1} label="Apple" />
                            <AutoCompleteOption value={2} label="Banana" />
                            <AutoCompleteOption value={3} label="Cherry" />
                        </UIAutoComplete>
                    )}
                </FormGroupInput>
            </FormGroup>
            <span>{`${JSON.stringify(value)}`}</span>
        </>
    );
}

const api = Axios.create({
    baseURL: "https://pokeapi.co/api/v2",
});

const lookup: ILookupApi = {
    searchUrl: "pokemon?limit=100",
    singleUrl: "pokemon/%s",
    resultsKey: "results",
    processOptions: (options) =>
        options.map((option) => ({ ...option, label: labelize(option.label ?? option.value) })),
};

function StoryAutoCompleteLookup(props: StoryAutoCompleteProps) {
    const { label, ...autoCompleteProps } = props;
    const [value, setValue] = useState<any | any[]>("pikachu");
    const setDataValue = (values) => {
        setValue(Array.isArray(values) ? [...values] : values);
    };
    return (
        <>
            <FormGroup>
                <FormGroupLabel>{label}</FormGroupLabel>
                <FormGroupInput>
                    {(inputProps) => (
                        <UIAutoComplete {...inputProps} {...autoCompleteProps} value={value} onChange={setDataValue}>
                            <AutoCompleteLookupOptions api={api} lookup={lookup} />
                        </UIAutoComplete>
                    )}
                </FormGroupInput>
            </FormGroup>
            <span>{`${JSON.stringify(value)}`}</span>
        </>
    );
}

export function AutoComplete() {
    return (
        <div className={storyStyle}>
            <h3>Default</h3>
            <div>
                <StoryAutoComplete label="Default" />
            </div>
            <div style={{ marginBottom: 116 }}>
                <StoryAutoComplete label="Opened" autoFocus />
            </div>
            <div>
                <StoryAutoComplete label="Disabled" disabled />
            </div>
            <div>
                <StoryAutoComplete label="Clearable" clear />
            </div>
            <div>
                <StoryAutoCompleteLookup label="Lookup" clear />
            </div>
            <div>
                <StoryAutoComplete label="Mulltiple - No Default Value" multiple value={undefined} />
            </div>
            <div>
                <StoryAutoComplete label="Mulltiple" multiple />
            </div>
            <div>
                <StoryAutoComplete label="Default multiple clearable" multiple clear />
            </div>
            <div>
                <StoryAutoCompleteLookup label="Lookup Mulltiple" multiple />
            </div>
            {/* ------------------- */}
            <h3>Small</h3>
            <div>
                <StoryAutoComplete label="Default" size="small" />
            </div>
            <div>{/* Skip active as only one can be autoFocused */}</div>
            <div>
                <StoryAutoComplete label="Disabled" size="small" disabled />
            </div>
            <div>
                <StoryAutoComplete label="Clearable" size="small" clear />
            </div>
            <div>
                <StoryAutoCompleteLookup label="Lookup" size="small" clear />
            </div>
            <div>
                <StoryAutoComplete label="Mulltiple - No Default Value" multiple size="small" value={undefined} />
            </div>
            <div>
                <StoryAutoComplete label="Mulltiple" multiple size="small" />
            </div>
            <div>
                <StoryAutoComplete label="Default multiple clearable" size="small" multiple clear />
            </div>
            <div>
                <StoryAutoCompleteLookup label="Lookup Mulltiple" size="small" multiple />
            </div>
        </div>
    );
}
