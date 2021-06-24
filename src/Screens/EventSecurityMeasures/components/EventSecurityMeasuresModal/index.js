import React from 'react';
import {Image, View} from "react-native";
import { withStyles, Text} from "@ui-kitten/components";
import {SeSeparator} from "../../../../Shared/Separator";
import {FooterButtons} from "../../../CreateEvent/components/FooterButtons";
import {SeModal} from "../../../../Shared/SeModal";

const EventSecurityMeasuresItemModalComponent = ({isOpen, onClose, securityMeasure, loading, eva}) => {
  const {style: styles, theme} = eva;

  return <SeModal isOpen={isOpen} onClose={onClose}>
    <Text style={styles?.title}>
      {securityMeasure?.name}
    </Text>
    <SeSeparator value={2}/>
    <Image
      style={styles.tinyLogo}
      source={{uri: 'https://images.unsplash.com/photo-1553531888-973dce69bd1f?ixid=MXwxMjA3fDF8MHxzZWFyY2h8MXx8bmF0dXJlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60'}}
    />
    <SeSeparator value={2}/>
    <View style={{flex: 2}}>
      <Text style={styles?.description}>
        {securityMeasure?.description}
      </Text>
    </View>
    <SeSeparator value={2}/>
    <FooterButtons
      style={styles?.containerButtons}
      leftAction={onClose}
      size='xs'
      gap={2}
      loading={loading}
      submitButton={false}
    />
  </SeModal>
}

export const EventSecurityMeasuresItemModal = withStyles(EventSecurityMeasuresItemModalComponent, (theme) => ({
  title: {
    fontSize: 18
  },
  description: {
    fontSize: 16,
    textAlign:'justify'
  },
  tinyLogo: {
    width: '100%',
    height: 200,
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
}));

