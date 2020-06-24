import React, { useState, useEffect } from 'react'
import { Modal, View, Text, StyleSheet } from 'react-native'
import { Colors, Typography } from '../../styles'
import { ButtonLightLink } from './Buttons'
import {ButtonLightPrimary} from './Buttons'

export interface Props {
  confirmAction: (() => void)
  onModalClose: (() => void)
  confirmText?: string
  animation?: 'none' | 'slide' | 'fade',
  visible: boolean,
  title: string,
  content?: React.ReactNode,
  subtitle?: string,
  hideAction?: boolean
  hideSubtitle?: boolean
}

const CustomModal: React.FC<Props> = (props) => {
  return (
      <Modal
      animationType={props.animation || 'slide'}
      transparent={true}
      visible={props.visible}
     >
      <View style={styles.modalSet}>

        <View style={styles.modalOverlay}></View>

        <View style={styles.modalContainer}>

          <View style={styles.modalHeader}>
            <Text style={styles.titleHeader}>{props.title}</Text>
            <ButtonLightLink onPress={props.onModalClose} color={Colors.BTBLUE} iconName="times-solid" iconColor={Colors.GREY100}/>
          </View>

          {
            !props.subtitle || props.hideSubtitle
            ? null
            : <Text style={styles.subtitleHeader}>{props.subtitle}</Text>
          }

          <View style={styles.modalContent}>
            {props.content}
          </View>

          {
            props.hideAction
            ? null
            : <View style={styles.modalActions}>
                <ButtonLightPrimary onPress={props.confirmAction} height={56} color={Colors.BTBLUE} text={props.confirmText}/>
              </View>
          }

          

        </View>
      </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
  modalSet: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.LIGHT,
    opacity: 0.7
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    width: '100%',
    backgroundColor: Colors.LIGHT,
    position: "absolute",
    zIndex: 10,
    opacity: 1,
    shadowColor: Colors.LIGHT,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4.65,
    shadowOpacity: 0.3,
    elevation: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32
  },
  modalHeader: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between'
  },
  titleHeader: {
    fontFamily: Typography.CircularStd500,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.15
  },
  subtitleHeader: {
    fontFamily: Typography.CircularStd400,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.GREY80,
    marginTop: 4
  },
  modalContent: {
    marginVertical: 32,
    minHeight: 100,
    width: '100%'
  },
  modalActions: {
    flex: 1,
    width: '100%'
  }
})

export default CustomModal