import * as React from "react";

type AssignableRef<ValueType> =
  | {
      bivarianceHack(instance: ValueType | null): void;
    }["bivarianceHack"]
  | React.MutableRefObject<ValueType | null>;

// tslint:disable-next-line: ban-types
function isFunction(value: any): value is Function {
  return !!(value && {}.toString.call(value) === "[object Function]");
}

function assignRef<RefValueType = any>(
  ref: AssignableRef<RefValueType> | null | undefined,
  value: any
) {
  if (ref == null) {
    return;
  }
  if (isFunction(ref)) {
    ref(value);
  } else {
    try {
      ref.current = value;
    } catch (error) {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
    }
  }
}

export function useForkedRef<RefValueType = any>(
  ...refs: (AssignableRef<RefValueType> | null | undefined)[]
) {
  return React.useMemo(() => {
    if (refs.every(ref => ref == null)) {
      return null;
    }
    return (node: any) => {
      refs.forEach(ref => {
        assignRef(ref, node);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}

export default useForkedRef;
