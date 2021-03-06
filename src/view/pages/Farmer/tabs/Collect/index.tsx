import * as React from 'react';
import { Grid, Row, Content } from 'native-base';
import CardSummary from '../../../../components/CardSummary';
import DataTable from '../../../../components/DataTable';
import Composer from '../../../../hoc/PageComposer';

import { InjectedFabProps } from '../../../../hoc/PageComposer/FabPage/index';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import activeRowsActions from '../../../../../store/modules/activeRows/actions';
import navActions from '../../../../../store/modules/nav/actions';
import { Route } from '../../../../navigation/routes';
import { State } from '../../../../../store/types';
import { dateSort } from '../../../../../utils/DateSort';
import {
  getWeeklyFarmerMilkTotal,
  getFormattedFarmersTransactions,
  getFarmerDayTotal,
} from '../../../../../store/modules/milk/selectors';
import { getFarmerTotalBalance } from '../../../../../store/selectors';
import styles from './style';

interface OwnPropsType {
}

interface DispatchPropsType {
  navigate(route: Route): void;
  setActiveMilkEntry(uuid: string): void;
  navigateToMilkEntry(): void;
}

interface StorePropsType {
  weeklybalance: string;
  weeklyTotal: string;
  dailyTotal: string;
  collectTransactions: any[];
}

interface OwnStateType {
}

type NestedPropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** FarmerSearch PropsType */
type PropsType = InjectedFabProps & NestedPropsType;

/**
 * Collect Tab Component
 */
class Collect extends React.Component<PropsType, OwnStateType> {

  public constructor(constructorProps: PropsType) {
    super(constructorProps);
  }

  private onAddPress = () => this.props.navigate(Route.ADD_MILK_ENTRY);
  private onPressEntry = (uuid: string) => {
    return () => {
      this.props.setActiveMilkEntry(uuid);
      this.props.navigateToMilkEntry();
    };
  }


  /** React componentDidMount */
  public componentDidMount() {
    this.props.listenToFab(this.onAddPress);
  }

  /**
   * Render method for Collect
   */
  public render() {
    const dataSummary = [{
      label: 'Today',
      value: this.props.dailyTotal,
      units: 'L',
    },                   {
      label: 'This Week',
      value: this.props.weeklyTotal,
      units: 'L',
    },                   {
      label: 'Balance',
      value: this.props.weeklybalance,
      units: 'UGX',
    },
    ];

    return (
      <Content style={styles.container}>
        <Grid style={styles.content}>
          <Row>
            <CardSummary
              data={dataSummary}
            />
          </Row>
          <Row>
            <DataTable
              headers={['Date', 'Volume (L)', 'Value (UGX)']}
              values={dateSort.sortDescending(this.props.collectTransactions)}
              onPressEntry={this.onPressEntry}
            />
          </Row>
        </Grid>
      </Content>
    );
  }
}

const CollectPage = new Composer<NestedPropsType>(Collect)
  .fab()
  .page;

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {
  return {
    weeklyTotal: getWeeklyFarmerMilkTotal(state),
    dailyTotal: getFarmerDayTotal(state),
    collectTransactions: getFormattedFarmersTransactions(state),
    weeklybalance: getFarmerTotalBalance(state),
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigate: (route: Route) => dispatch(navActions.navigateTo(route)),
    setActiveMilkEntry: (uuid: string) => dispatch(activeRowsActions.setActiveMilkEntry(uuid)),
    navigateToMilkEntry: () => dispatch(navActions.navigateTo(Route.MILK_ENTRY_DETAILS)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectPage);
