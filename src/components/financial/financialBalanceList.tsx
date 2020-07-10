import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native'
import { Colors, Typography } from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../shared/Icons/Icon';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { getFinancialBalanceList } from '../../redux/actions/financialBalanceList'
import { formatCurrency } from '../../helpers/helpers';

const FinancialBalanceList = ({navigation} : any) => {
  const dispatch = useDispatch()
  const financialBalanceList = useSelector((state: RootState) => state.financialBalanceList)
  const currentSelectedOrganizer = useSelector((state: RootState) => state.currentSelectedOrganizer)
  const [totalSum, setTotalSum] = useState(0)

  useEffect(() => {
    if (currentSelectedOrganizer.success) {
      dispatch(getFinancialBalanceList(currentSelectedOrganizer.currentOrganizer.codigo))
    }
  }, [currentSelectedOrganizer])


  const row = (item : any) => (
    <View style={styles.tableRow}>
      <Text style={{...styles.td, flex: 3}}>{item.nome_conta}</Text>
      <Text style={{...styles.td, textAlign: 'right', flex: 2}}>{formatCurrency(item.valor_futuro.toString()).replace('R$', '')}</Text>
      <Text style={{...styles.td, textAlign: 'right', flex: 2}}>{formatCurrency(item.saldo_disponivel.toString()).replace('R$', '')}</Text>
      <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('FinancialBalance', { accountId: item.codigo, token: item.token })}>
        <Icon name="file-invoice-dollar-solid" color={Colors.ACTIVE} size={24}/>
      </TouchableOpacity>
    </View>
  )

  const list = () => {
    if (financialBalanceList.loading) return <ActivityIndicator size={32} color={Colors.ACTIVE}/>
    else if (financialBalanceList.success) {
      const totalSum = financialBalanceList.list.map((item : any) => item.saldo_disponivel)
      Promise.all(totalSum).then(() => setTotalSum(totalSum.reduce((prev : any, curr : any, index: number) => prev + curr, 0)))
      
      return financialBalanceList.list.length
        ? <FlatList
        data={financialBalanceList.list}
        keyExtractor={(item : any) => item.codigo.toString()}
        renderItem={({item} : any) => row(item)}
        />
        : <Text style={styles.noDataText}>Nenhuma conta disponível.</Text>
      }
    else if (financialBalanceList.error) return <Text>{financialBalanceList.error}</Text>
  }

  return (
    <View style={{flex: 1}}>
      <Text style={styles.title}>Saldo</Text>
      <View style={styles.tableRow}>
          <Text style={{...styles.th, flex: 3}}>Conta</Text>
          <Text style={{...styles.th, flex: 2, textAlign: 'right'}}>Total (R$)</Text>
          <Text style={{...styles.th, flex: 2, textAlign: 'right'}}>Disponível (R$)</Text>
          <View style={{width: 24}}></View>
      </View>
      {list()}
      { financialBalanceList.success 
        ? <View style={styles.totalBalanceBox}>
            <Text style={styles.availableSumLabel}>Saldo Disponível</Text>
            <Text style={styles.availableSumValue}>{formatCurrency(totalSum.toString())}</Text>
          </View>
        : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 24,
    paddingLeft: 20,
    paddingBottom: 16,
    lineHeight: 24,
    fontSize: 20,
    fontFamily: Typography.CircularStd500
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: 58,
    borderBottomColor: Colors.GREY24,
    borderBottomWidth: 1,
    paddingHorizontal: 12,
  },
  th: {
    fontFamily: Typography.CircularStd500,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 0.1,
    color: Colors.GREY60,
    paddingHorizontal: 8,
  },
  td: {
    fontFamily: Typography.CircularStd400,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.1,
    color: Colors.GREY100,
    paddingHorizontal: 8,
  },
  noDataText: {
    fontFamily: Typography.CircularStd400,
    textAlign: 'center',
    lineHeight: 58,
    color: Colors.GREY60,
    flex: 1
  },
  totalBalanceBox: {
    height: 64,
    position: 'relative',
    bottom: 0,
    backgroundColor: Colors.BLUE12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  availableSumLabel: {
    fontFamily: Typography.CircularStd500,
    color: Colors.ACTIVE,
    fontSize: 12,
    lineHeight: 15
  },
  availableSumValue: {
    fontFamily: Typography.CircularStd600,
    color: Colors.ACTIVE,
    fontSize: 24,
    lineHeight: 30
  }
});

export default FinancialBalanceList