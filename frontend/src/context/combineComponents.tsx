import React, { ComponentType, ReactElement } from "react";

type ProviderProps = {
  children: React.ReactNode;
};

type ContextProvider = ComponentType<ProviderProps>;

export default function combineProviders(
  providers: ContextProvider[],
): React.FC<ProviderProps> {
  return ({ children }: ProviderProps): ReactElement => {
    return providers.reduceRight((child, Provider) => {
      return <Provider>{child}</Provider>;
    }, children as ReactElement);
  };
}
