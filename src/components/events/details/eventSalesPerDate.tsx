import React, { useState, useEffect } from 'react'
import {View, StyleSheet, Text, ActivityIndicator, Dimensions} from 'react-native'
import { Colors, Typography } from '../../../styles'
import { useDispatch, useSelector } from 'react-redux'
import { getEventDetailSalesPerDate } from '../../../redux/actions/eventDetails'
import { RootState } from '../../../redux/store/store'
import { formatCurrency } from '../../../helpers/helpers'
import { LineChart } from 'react-native-chart-kit'
import Chip from '../../shared/Chip'
import moment from 'moment'
import Tooltip from 'react-native-walkthrough-tooltip';

export interface Props {
  eventId: string | number
}


const EventSalesPerDate = (props : Props) => {
  const dispatch = useDispatch()
  const eventSalesPerDate = useSelector((state : RootState) => state.eventDetailSalesPerDate)
  const [graphWidth, setGraphWidth] = useState(0)
  const [tooltipLocation, setTooltipLocation] = useState({visible: false, top: 20, left: 30})
  const [tooltipContent, setTooltipContent] = useState(<Text style={{color: Colors.LIGHT}}>Teste</Text>)

  useEffect(() => {
    dispatch(getEventDetailSalesPerDate(props.eventId))
  }, [])

  const salesPerDate = () => {
    if (eventSalesPerDate.loading) return <ActivityIndicator size={64} color={Colors.ACTIVE} />
    else if (eventSalesPerDate.success) { 
      let data = eventSalesPerDate.salesPerDate.map((sale : any) => sale.valor_total)
      let labels = eventSalesPerDate.salesPerDate.map((label : any, index : number) => {
        return index % 5 === 0 
          ? moment(label.data_pedido, 'YYYY-MM-DD').format('DD/M')
          : ''
      })
      
      const dataClicked = (props: any) => {
        let currentDate = moment(eventSalesPerDate.salesPerDate[props.index].data_pedido, 'YYYY-MM-DD').format('DD.MMMM').slice(0,6).toUpperCase()
        let currentValue = formatCurrency(eventSalesPerDate.salesPerDate[props.index].valor_total.toString())
        let currentQuantity =  eventSalesPerDate.salesPerDate[props.index].qtd_ingressos
        setTooltipContent((
          <View>
            <Text style={styles.tooltipDate}>Até {currentDate}</Text>
            <Text style={styles.tooltipValue}>{currentValue}</Text>
            <Text style={styles.tooltipQuantity}>{currentQuantity} {currentQuantity === 1 ? 'Ingresso' : 'Ingressos'}</Text>
          </View>
        ))
        setTooltipLocation({visible: true, top: props.y, left: props.x})
      }

      return (
        <View style={{flex: 1, width: '100%'}}>
          <View style={styles.summaryHeader} onLayout={(event) => setGraphWidth(event.nativeEvent.layout.width)}>
            <Text style={styles.summaryBoxTitle}>Vendas por Data</Text>
            <Chip text="30 dias" textColor={Colors.ACTIVE} backgroundColor={Colors.ACTIVE_TRANSPARENT} size="small"/>
          </View>
          <LineChart
            data={{
              labels: labels,
              datasets: [
                {
                  data: data
                }
              ]
            }}
            width={graphWidth} 
            height={220} 
            formatYLabel={(string : string) =>  formatCurrency(string).replace('R$', '')}
            withDots={true}
            withShadow={false}
            segments={4}
            withOuterLines={false}
            withInnerLines={false}
            yLabelsOffset={10}
            onDataPointClick={(props: any) => dataClicked(props)}
            chartConfig={{
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0,
              color: () => Colors.ACTIVE,
              labelColor: () => Colors.GREY100,
              style: {
                backgroundColor: Colors.GREY100,
                marginLeft: 20
              },
              propsForDots: {
                r: 0
              },
              count: 0,
              data: [
                  {
                    data: data
                  }
                ],
                width: graphWidth,
                height: 220,
                paddingTop: 0,
                paddingRight: 0,
            }}
            style={{
              marginVertical: 8,
            }}
          />
          <Tooltip 
            isVisible={tooltipLocation.visible} 
            content={tooltipContent} 
            placement="top"
            onClose={() => setTooltipLocation({visible: false, top: 0, left: 0})}
            contentStyle={{backgroundColor: Colors.GREY100, width: 120, height: 80}}
            backgroundColor="transparent"
            tooltipStyle={{top: tooltipLocation.top - 50, left: tooltipLocation.left - 60}}
            useReactNativeModal={false}
            allowChildInteraction={true}
          >
            <View></View>
          </Tooltip>
        </View>
      )
    } else if (eventSalesPerDate.error) return <Text>{eventSalesPerDate.error}</Text>
  }
  

  return (
    <View style={styles.summaryBox}>
      {salesPerDate()}
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
  summaryHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  summaryBoxTitle: {
    fontFamily: Typography.CircularStd500,
    fontSize: 20,
    lineHeight: 28,
    color: Colors.GREY100,
    letterSpacing: 0.15
  },
  tooltipDate: {
    color: Colors.LIGHT,
    fontFamily: Typography.CircularStd400,
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.25
  },
  tooltipValue: {
    color: Colors.LIGHT,
    fontFamily: Typography.CircularStd600,
    fontSize: 14,
    lineHeight: 18,
  },
  tooltipQuantity: {
    color: Colors.LIGHT,
    fontFamily: Typography.CircularStd400,
    fontSize: 14,
    lineHeight: 18,
  }
});

export default EventSalesPerDate