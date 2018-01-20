import * as React from 'react';
import { Root, Grid, Row, Col, Content, Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import LoanSummary from '../../components/LoanSummary';
import LoansTable from '../../components/LoansTable';
import createPage from '../../../../lib/generators/Page/index';

interface CollectPropsType {
  farmerName: string;
  allTimeTotal: string;
  currentWeekTotal: string;
  currentMonthTotal: string;
  collectionValues: any[];
}

/**
 * Collect Tab Component
 */
class Collect extends React.Component<CollectPropsType, {}> {

  // TODO: need to connect this to the redux state
  /**
   * Render method for Farmer
   */
  public render() {
    return (
      <Content>
        <Grid>
          <Row>
            <LoanSummary 
                title="Bradley the Farmer"
                totalRemainingBalance="$35"
                totalWeeklyPaymentBalence="$5"
            />
          </Row>
          <Row>
            <LoansTable
              values={this.props.collectionValues}
            />
          </Row>
        </Grid>
        <Button block info>
          <Text>
            ADD ENTRY
          </Text>
        </Button>
      </Content>
    );
  }
}

export default createPage(Collect, 'menu');
