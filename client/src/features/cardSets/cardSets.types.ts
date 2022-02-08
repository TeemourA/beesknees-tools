import { RequestStatuses } from '../../interface/network';

export interface CardSetData {
  title: string;
  url: string;
}

export interface CardSet extends CardSetData {
  __id: string;
}

export interface CardSetsState {
  cardSets: CardSet[];
  status: RequestStatuses;
}
