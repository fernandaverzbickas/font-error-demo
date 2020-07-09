import React, { useState, useEffect } from 'react'
import {View, StyleSheet, Text, ActivityIndicator, FlatList} from 'react-native'
import { Colors, Typography } from '../../../styles'
import { useDispatch, useSelector } from 'react-redux'
import { getEventDetailSalesPerProduct } from '../../../redux/actions/eventDetails'
import { RootState } from '../../../redux/store/store'
import { formatCurrency } from '../../../helpers/helpers'

export interface Props {
  eventId: string | number
}


const EventSalesPerProduct = (props : Props) => {
  const dispatch = useDispatch()
  const eventSalesPerProduct = useSelector((state : RootState) => state.eventDetailSalesPerProduct)

  useEffect(() => {
    dispatch(getEventDetailSalesPerProduct(props.eventId))
  }, [])

  const row = (item : any) => (
      <View style={styles.tableRow}>
        <Text style={{...styles.td, fontFamily: Typography.CircularStd500, flex: 3}}>{item.nome_produto}</Text>
        <Text style={{...styles.td, textAlign: 'right', flex: 2}}>{item.qtd_vendas}</Text>
        <Text style={{...styles.td, textAlign: 'right', flex: 2}}>{formatCurrency(item.valor_vendas.toString())}</Text>
      </View>
    )
  
  const salesPerProduct = () => {
    if (eventSalesPerProduct.loading) return <ActivityIndicator size={64} color={Colors.ACTIVE} />
    else if (eventSalesPerProduct.success) {
      return (
      <View style={{flex: 1, width: '100%', marginBottom: 8}}>
        <Text style={styles.summaryBoxTitle}>Vendas por Produto</Text>
        <View style={styles.tableRow}>
          <Text style={{...styles.th, flex: 3}}>Setor</Text>
          <Text style={{...styles.th, flex: 2, textAlign: 'right'}}>Ingressos</Text>
          <Text style={{...styles.th, flex: 2, textAlign: 'right'}}>Receita</Text>
        </View>
        {eventSalesPerProduct.salesPerProduct.length
          ? <FlatList
          data={eventSalesPerProduct.salesPerProduct}
          keyExtractor={(item : any) => item.codigo_produto}
          renderItem={(item : any) => row(item.item)}
          />
          : <Text style={styles.noDataText}>Nenhuma venda realizada ainda.</Text>
        }
      </View>)
    } else if (eventSalesPerProduct.error) return <Text>{eventSalesPerProduct.error}</Text>
  }

  return (
    <View style={styles.summaryBox}>
      {salesPerProduct()}
    </View>
  )
}

const styles = StyleSheet.create({
  summaryBox: {
    backgroundColor: Colors.LIGHT,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.GREY24,
    marginBottom: 60
  }, 
  summaryBoxTitle: {
    fontFamily: Typography.CircularStd500,
    fontSize: 20,
    lineHeight: 28,
    color: Colors.GREY100,
    letterSpacing: 0.15,
    padding: 16
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 58,
    borderBottomColor: Colors.GREY24,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
  },
  th: {
    fontFamily: Typography.CircularStd500,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 0.1,
    color: Colors.GREY80,
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
    color: Colors.GREY60
  }

});

export default EventSalesPerProduct