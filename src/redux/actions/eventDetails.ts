import { 
  EVENT_SUMMARY_REQUEST, 
  EVENT_SUMMARY_SUCCESS, 
  EVENT_SUMMARY_FAILURE,
  EVENT_SALES_PER_DATE_REQUEST,
  EVENT_SALES_PER_DATE_SUCCESS,
  EVENT_SALES_PER_DATE_FAILURE,
  EVENT_SALES_PER_PRODUCT_FAILURE,
  EVENT_SALES_PER_PRODUCT_REQUEST,
  EVENT_SALES_PER_PRODUCT_SUCCESS
} from "./types"
import api from '../../api/api'
import moment from 'moment'

const eventSummaryRequest = () => {
  return {
    type: EVENT_SUMMARY_REQUEST
  }
}

const eventSummarySuccess = (summary : any) => {
  return {
    type: EVENT_SUMMARY_SUCCESS,
    payload: summary
  }
}

const eventSummaryFailed = () => {
  return {
    type: EVENT_SUMMARY_FAILURE
  }
}

export const getEventDetailSummary = (eventId : number | string) => {
  return async function (dispatch: any) {
    dispatch(eventSummaryRequest())
    await api.get('panel/reports/sales/summary', {params: {event_id: eventId}})
      .then((response) => {
        dispatch(eventSummarySuccess(response.data))
      })
      .catch((error) => {
        dispatch(eventSummaryFailed())
      })
  }
}

const eventSalesPerDateRequest = () => {
  return {
    type: EVENT_SALES_PER_DATE_REQUEST
  }
}

const eventSalesPerDateSuccess = (salesPerDate : any) => {
  return {
    type: EVENT_SALES_PER_DATE_SUCCESS,
    payload: salesPerDate
  }
}

const eventSalesPerDateFailed = () => {
  return {
    type: EVENT_SALES_PER_DATE_FAILURE
  }
}

export const getEventDetailSalesPerDate = (eventId : number | string) => {
  return async function (dispatch: any) {
    dispatch(eventSalesPerDateRequest())
    const min_date = moment().subtract(30, 'days').format('YYYY-MM-DD')
    const max_date = moment().format('YYYY-MM-DD')
    await api.get('panel/reports/sales/revenue/time', {params: {event_id: eventId, min_date, max_date}})
      .then((response) => {
        let data = JSON.parse(JSON.stringify(response.data))
        let filledData = Array(30).fill(1).map((item, index) => {
          let day = moment().subtract(index, 'days').format('YYYY-MM-DD')
          let apiData = data[0].data.find((item : any) => {
            return item.data_pedido === day

          })
          if (apiData && apiData !== undefined) {
            return {...apiData, qtd_ingressos: parseInt(apiData.qtd_ingressos)}
          } else {
            return {
              data_pedido: day,
              qtd_ingressos: 0,
              valor_total: 0
            }
          }
        })
        dispatch(eventSalesPerDateSuccess(filledData.reverse()))
      })
      .catch((error) => {
        dispatch(eventSalesPerDateFailed())
      })
  }
}


const eventSalesPerProductRequest = () => {
  return {
    type: EVENT_SALES_PER_PRODUCT_REQUEST
  }
}

const eventSalesPerProductSuccess = (salesPerProduct : any) => {
  return {
    type: EVENT_SALES_PER_PRODUCT_SUCCESS,
    payload: salesPerProduct
  }
}

const eventSalesPerProductFailed = () => {
  return {
    type: EVENT_SALES_PER_PRODUCT_FAILURE
  }
}

export const getEventDetailSalesPerProduct = (eventId : number | string) => {
  return async function (dispatch: any) {
    dispatch(eventSalesPerProductRequest())
    const min_date = moment().subtract(30, 'days').format('YYYY-MM-DD')
    const max_date = moment().format('YYYY-MM-DD')
    await api.get('panel/reports/sales/summary/products', {params: {event_id: eventId, min_date, max_date}})
      .then((response) => {
        dispatch(eventSalesPerProductSuccess(response.data))
      })
      .catch((error) => {
        dispatch(eventSalesPerProductFailed())
      })
  }
}