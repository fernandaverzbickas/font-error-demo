import React, { useState, useEffect } from 'react'
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native'
import { Colors, Typography } from '../../../styles'
import { useDispatch, useSelector } from 'react-redux'
import { getEventDetailSummary } from '../../../redux/actions/eventDetails'
import { RootState } from '../../../redux/store/store'
import { formatCurrency } from '../../../helpers/helpers'

export interface Props {
  eventId: string | number
}


const EventSummary = (props : Props) => {
  const dispatch = useDispatch()
  const eventSummary = useSelector((state : RootState) => state.eventDetailSummary)


  useEffect(() => {
    dispatch(getEventDetailSummary(props.eventId))
  }, [])

  const summary = () => {
    
    if (eventSummary.loading) return <ActivityIndicator size={64} color={Colors.ACTIVE} />
    else if (eventSummary.success) {
      const participants = eventSummary.summary.qtd_ingressos ? parseInt(eventSummary.summary.qtd_ingressos) + parseInt(eventSummary.summary.qtd_cortesias) : parseInt(eventSummary.summary.qtd_cortesias) 
      return (
        <View>
          <Text style={styles.summaryBoxTitle}>Resumo</Text>
          <View style={styles.summaryOverview}>
            <View style={{width: '60%'}}>
              <Text  style={styles.summaryOverviewValue}>{formatCurrency(eventSummary.summary.total_receita)}</Text>
              <Text  style={styles.summaryOverviewLabel}>Total de Receita</Text>
            </View>
            <View style={{width: '40%'}}>
              <Text style={styles.summaryOverviewValue}>{participants}</Text>
              <Text style={styles.summaryOverviewLabel}>Participantes</Text>
            </View>
          </View>
            <View style={styles.row}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{eventSummary.summary.qtd_ingressos || 0}</Text>
                <Text style={styles.summaryLabel}>Vendidos</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{eventSummary.summary.qtd_cortesias}</Text>
                <Text style={styles.summaryLabel}>Cortesias</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{formatCurrency(eventSummary.summary.ticket_medio)}</Text>
                <Text style={styles.summaryLabel}>Ticket Médio</Text>
              </View>
            </View>
            <View style={{...styles.row, marginTop: 24}}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Pendentes</Text>
                <Text style={{...styles.summaryValue, fontSize: 20}}>{eventSummary.summary.qtd_pendentes || 0}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Dias Restantes</Text>
                <Text style={{...styles.summaryValue, fontSize: 20}}>{eventSummary.summary.dias_para_evento}</Text>
              </View>
            </View>
        </View>
      )
    } else if (eventSummary.error) {
      return <Text>{eventSummary.error}</Text>
    }
  }
  

  return (
    <View style={styles.summaryBox}>
      {summary()}
    </View>
  )
}

const styles = StyleSheet.create({
  summaryBox: {
    backgroundColor: Colors.LIGHT,
    minHeight: 288,
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.GREY24,
    padding: 16,
    marginBottom: 24
  }, 
  summaryBoxTitle: {
    fontFamily: Typography.CircularStd500,
    fontSize: 20,
    lineHeight: 28,
    color: Colors.GREY100,
    letterSpacing: 0.15
  },
  summaryOverview: {
    minHeight: 82,
    backgroundColor: Colors.BLUE6,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8
  },
  summaryOverviewValue: {
    fontFamily: Typography.CircularStd500,
    fontSize: 24,
    lineHeight: 30,
    color: Colors.GREY100,
    letterSpacing: -0.25
  },
  summaryOverviewLabel: {
    fontFamily: Typography.CircularStd400,
    fontSize: 12,
    lineHeight: 15,
    color: Colors.ACTIVE,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "center",
  },
  summaryItem: {
    width: '33%',
  },
  summaryValue: {
    fontFamily: Typography.CircularStd500,
    fontSize: 16,
    lineHeight: 28,
    color: Colors.GREY100,
    letterSpacing: 0.15,
  },
  summaryLabel: {
    fontFamily: Typography.CircularStd400,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.GREY60,
    letterSpacing: 0.4,
  }
});

export default EventSummary