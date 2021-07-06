import React from 'react';
import {Image, View} from "react-native";
import { withStyles, Text} from "@ui-kitten/components";
import {SeSeparator} from "../../../../Shared/Separator";
import {FooterButtons} from "../../../CreateEvent/components/FooterButtons";
import {SeModal} from "../../../../Shared/SeModal";
import {SeImageWithCaption} from "../../../../Shared/SeImageWithCaption";
import {getImageSecurityCredits} from "../../../../lib/helper";

const EventSecurityMeasuresItemModalComponent = ({isOpen, onClose, securityMeasure, loading, eva}) => {
  const {style: styles, theme} = eva;

  const {caption, captionLink} = getImageSecurityCredits(securityMeasure?.id)

  //Img to check

  return <SeModal isOpen={isOpen} onClose={onClose}>
    <Text style={styles?.title}>
      {securityMeasure?.name}
    </Text>
    <SeSeparator value={2}/>
    <SeImageWithCaption
      style={styles.tinyLogo}
      source={{uri: securityMeasure?.img}}
      caption={caption}
      captionLink={captionLink}
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

