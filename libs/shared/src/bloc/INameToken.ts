import React from 'react';

export default interface INameToken {
  get endpoint(): string;
  get fullEndpoint(): string;
  get component(): React.ComponentType<any> | undefined;
  get isProtected(): boolean;
  get isGwt(): boolean;
  get fullWidth(): boolean;
  get queryParams(): { [param: string]: string };
}
