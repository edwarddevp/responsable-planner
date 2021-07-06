import React from 'react';
import {Layout, withStyles} from "@ui-kitten/components";
import {Dimensions, Modal, View, ScrollView} from "react-native";
import {useIsKeyboardOpen} from "../../hooks/useIsKeyboardOpen";
import {Animated} from 'react-native';

const {height} = Dimensions.get('window');

const SeModalComponent = ({eva, children, isOpen, onClose, flexContent = 5, upperSpace = 0.5}) => {
  const [isKeyboardOpen] = useIsKeyboardOpen()
  const styles = eva?.style

  return <Modal
    animationType="fade"
    transparent={true}
    visible={isOpen}
    onRequestClose={onClose}
  >
    <View style={styles.backdrop}>
      <View style={styles?.spaceBetween(isKeyboardOpen, upperSpace)}/>
      <View style={styles.centeredView(flexContent)}>
        <ScrollView>
          <Layout level="1" style={styles?.container}>
            {children}
          </Layout>
        </ScrollView>
      </View>
      <View style={styles.spaceBetween(isKeyboardOpen, upperSpace)}/>
    </View>
  </Modal>
};

export const SeModal = withStyles(SeModalComponent, (theme) => ({
  centeredView: (flexContent) => ({
    flex: flexContent,
    alignItems: "center"
  }),
  spaceBetween: (isKeyboardOpen, upperSpace) => ({
    flex: isKeyboardOpen ? 0.25 : upperSpace
  }),
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    padding: 24,
    width: 328,
    borderRadius:6
  },
}));