import INameToken from '@alkord/shared/bloc/INameToken';

export interface IAlert {
  message: string;
  nameToken?: INameToken;
}

export default interface IAlertProvider {
  onTokenAlterado(): Promise<IAlert | undefined>;
}
