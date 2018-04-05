import {invoker, defaultTo} from "ramda";
import { List, Map } from "immutable";

export const get = invoker(1, "get");
export const getIn = invoker(1, "getIn");
export const set = invoker(2, "set");
export const setIn = invoker(2, "setIn");
export const deleteField = invoker(1, "delete");
export const deleteIn = invoker(1, "deleteIn");
export const toString = invoker(0, "toString");
export const toISOString = invoker(0, "toISOString");
export const map = invoker(1, "map");
export const includes = invoker(1, "includes");
export const push = invoker(1, "push");
export const toSet = invoker(0, "toSet");
export const toList = invoker(0, "toList");
export const isEmpty = invoker(0, "isEmpty");
export const remove = invoker(1, "remove");
export const indexOf = invoker(1, "indexOf");
export const reduce = invoker(2, "reduce");
export const keys = invoker(0, "keys");
export const keySeq = invoker(0, "keySeq");
export const update = invoker(2, "update");
export const updateIn = invoker(2, "updateIn");
export const filter = invoker(1, "filter");
export const mapEntries = invoker(1, "mapEntries");
export const entrySeq = invoker(0, "entrySeq");

export const defaultToEmptyList = defaultTo(new List());
export const defaultToEmptyMap = defaultTo(new Map());

