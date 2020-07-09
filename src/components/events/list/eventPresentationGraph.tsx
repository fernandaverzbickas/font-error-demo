import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native'
import { Colors, Typography } from '../../../styles'
import api from '../../../api/api'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store/store'
import { addThousandSeparator, formatCurrency } from '../../../helpers/helpers'

export interface Props {
  eventCode: string | number
}

export interface IData {
  loading: boolean,
  data: any,
  success: boolean,
  error: boolean
}

const EventGraph: React.FC<Props> = (props) => {
  const [graphData, setGraphData] = useState<IData>({
    loading: true,
    data: null,
    success: false,
    error: false
  })
  const [isMounted, setMounted] = useState(false)
  const eventsListLoading = useSelector((state: RootState) => state.eventList.loading)

  const handleLazyLoad = async () => {
    if (isMounted) {
      let min_date = moment().subtract(7, 'days').format('YYYY-MM-DD')
      let max_date =  moment().format('YYYY-MM-DD')
        setGraphData({...graphData, loading: true})
        await api.get('panel/reports/sales/revenue/time', {params: {event_id: props.eventCode, min_date, max_date}})
          .then(async (response) => {
            await api.get('panel/reports/sales/summary', {params: {event_id: props.eventCode}})
              .then(summary => {
                setGraphData({...graphData, loading: false, success: true, data: {time: response.data, summary: summary.data}})
              })
              .catch((error) => {
                setGraphData({...graphData, loading: false, success: false, data: null, error: true})
              })
          })
          .catch((error) => {
            setGraphData({...graphData, loading: false, success: false, data: null, error: true})
          })
        }
  }

  useEffect(() => {
    handleLazyLoad()
  }, [isMounted, props.eventCode, eventsListLoading])

  useEffect(() => {
      setMounted(true)
  }, [])

  const calculateBarHeight = (value: string | number) => {
    let ticketNumber = typeof value === 'string' ? parseInt(value) : value
    let allValues = graphData.data.time[0].data.map((item: any) => item.qtd_ingressos)
    let maxValue = allValues.length ? Math.max(...allValues) : 74
    return ticketNumber * 74 / maxValue
  }

  const graph = (item : any) => {
    let barHeight = calculateBarHeight(item.qtd_ingressos)
    return (
      <View>
        <View style={{
          ...styles.bar,
          backgroundColor: item.qtd_ingressos ? Colors.ACTIVE : Colors.ACTIVE_TRANSPARENT, 
          height: barHeight ? barHeight : 5}}
        ></View>
        <Text style={styles.graphLabel}>{moment(item.data_pedido).format('dddd').charAt(0).toUpperCase()}</Text>
      </View>
    )
  }

  const data = () => {
    if (graphData.loading) {
      return (
        <ActivityIndicator size={64} color={Colors.ACTIVE}></ActivityIndicator>
      )
    } else if(graphData.success) {
      let dailyData = Array(7).fill(1).map((value, index) => {
        let actualValue = graphData.data.time[0].data.find((item: any) => item.data_pedido === moment().subtract(index, 'days').format('YYYY-MM-DD'))
        return actualValue ? actualValue : {
          data_pedido: moment().subtract(index, 'days'),
          valor_total: 0,
          qtd_ingressos: 0
        }
      })
      return (
        <View style={styles.graphContainerColumns}>
            <FlatList 
              data={dailyData.reverse()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item} : any) => graph(item)}
              style={styles.graphContainer}
            />
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.label}>Ingressos</Text>
              <Text style={styles.value}>{addThousandSeparator(graphData.data.summary.qtd_ingressos) || 0}</Text>
            </View>
            <View>
              <Text style={styles.label}>Receita</Text>
              <Text style={styles.value}>{formatCurrency(graphData.data.summary.total_receita)}</Text>
            </View>
          </View>
          <View style={styles.xAxis}></View>
        </View>
      )
    } else if(graphData.error) {
      return (
        <Text>Erro, tente novamente.</Text>
      )
    }
  }


  return (
    <View style={styles.graphBoxContainer}>
      {data()}
    </View>
  )
}

const styles = StyleSheet.create({
  graphBoxContainer: {
    maxHeight: 130,
    height: 130,
    backgroundColor: Colors.BLUE6,
    borderRadius: 8,
    marginTop: 12,
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  graphContainerColumns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '100%'
  },
  graphContainer: {
    width: '55%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%'
  },
  infoContainer: {
    width: '45%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: "flex-start",
    justifyContent: 'space-between',
    height: '100%',
    paddingLeft: 20
  },
  label: {
    fontFamily: Typography.CircularStd400,
    color: Colors.BTBLUE,
    fontSize: 14,
    lineHeight: 18
  },
  value: {
    fontFamily: Typography.CircularStd600,
    color: Colors.GREY100,
    fontSize: 16,
    lineHeight: 23
  },
  bar: {
    borderTopEndRadius: 100,
    borderTopLeftRadius: 100,
    width: 8
  },
  graphLabel: {
    fontFamily: Typography.CircularStd500,
    fontSize: 10,
    lineHeight: 13,
    color: Colors.ACTIVE,
    marginTop: 2
  },
  xAxis: {
    position: 'absolute',
    width: '55%',
    borderBottomColor: Colors.BLUE12,
    borderBottomWidth: 1,
    bottom: 15
  }
})

export default EventGraph