import React from "react";

interface ListProps {
    list: string[];
}

export function List(props: ListProps) {
    return <ul>{props.list.map((regalo) => (
        <li key={regalo}>{regalo}</li>
    ))}</ul>;
}
