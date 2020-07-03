import React from 'react';
import {View, StyleSheet, Modal, SafeAreaView, StatusBar} from 'react-native';
import PropTypes from 'prop-types';
import {APP_COLOR} from '../../res/styles/AppStyles';

const ModalBase = (props) => {
  const {modalVisible, onRequestClose, children, containerStyle} = props;

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}>
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, containerStyle]}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={APP_COLOR.STATUS_BAR_OVERLAY}
          />
          {children}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

ModalBase.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  containerStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: APP_COLOR.OVERLAY,
  },
  container: {
    flex: 1,
  },
});

export default ModalBase;
