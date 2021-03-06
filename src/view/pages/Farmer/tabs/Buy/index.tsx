import * as React from 'react';
import { Content, Button, Text } from 'native-base';
import { View } from 'react-native';
import CardSummary from '../../../../components/CardSummary';
import DataTable from '../../../../components/DataTable';
import styles from './style';
// import Composer from '../../../../hoc/PageComposer';
import { connect } from 'react-redux';
import ComingSoonOverlay, { default as createComingSoonOverlay } from '../../../../hoc/PageComposer/ComingSoon/index';

interface OwnPropsType {
  farmerName: string;
  currentDayTotal: string;
  currentWeekTotal: string;
  currentMonthTotal: string;
  purchaseTransactions: any[];
}

interface DispatchPropsType {
}

interface StorePropsType {
}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

interface OwnStateType {
}

/**
 * Loan Tab Component
 */
class Buy extends React.Component<PropsType, OwnStateType> {

  private onPressEntry = (uuid: string) => {
    return () => {
      // example from collect
      // this.props.setActiveMilkEntry(uuid);
      // this.props.navigateToMilkEntry();
    };
  }
  /**
   * Render method for Loan
   */
  public render() {
    const testData = [{
      label: 'Today',
      value: this.props.currentDayTotal,
      units: 'UGX',
    },                {
      label: 'This Week',
      value: this.props.currentWeekTotal,
      units: 'UGX',
    },                {
      label: 'This Month',
      value: this.props.currentMonthTotal,
      units: 'UGX',
    },
    ];
    return (
      <Content style={styles.container}>
        <View style={styles.content}>
          <CardSummary
            data={testData}
          />
          <DataTable
            headers={['Date', 'Product', 'Quantity', 'Price']}
            values={this.props.purchaseTransactions}
            onPressEntry={this.onPressEntry}
          />
          <Button block primary>
            <Text>
              BUY PRODUCTS
          </Text>
          </Button>
        </View>
      </Content>
    );
  }
}

const ProductComingSoonPage = ComingSoonOverlay<PropsType>(Buy);
createComingSoonOverlay(Buy);

export default connect(
)(ProductComingSoonPage);

// export default new Composer<PropsType>(Loan)
//   .page;
