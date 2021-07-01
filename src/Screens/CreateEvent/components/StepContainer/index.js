import React from 'react';
import {Text, withStyles} from "@ui-kitten/components";
import {View} from "react-native";
import {FooterButtons} from "../FooterButtons";
import {BackIcon} from "../../../../Shared/icons";
import {SeSeparator} from "../../../../Shared/Separator";

const StepContainerComponent = (
  {
    eva,
    children,
    previousPage,
    changePage,
    loading,
    title,
    description,
    submitButton = true,
    leftAction,
    footerButtons
  }) => {
  const {style: styles} = eva

  return <>
    <View style={styles?.containerTitle}>
      <View style={styles?.backButtonTitle}>
        <BackIcon onPress={previousPage} fill='white' style={styles?.backIcon}/>
        <Text style={styles?.h1} numberOfLines={2}>{title}</Text>
        <View style={styles?.backIcon}/>
      </View>
      <SeSeparator/>
      <Text style={styles?.h2}>{description}</Text>
    </View>
    <SeSeparator/>
    <View style={styles?.containerForm}>
      {children}
    </View>
    <FooterButtons
      buttonWidth={120}
      style={styles?.containerButtons}
      leftAction={leftAction}
      rightAction={changePage}
      loading={loading}
      submitButton={submitButton}
      {...footerButtons}
    />
  </>
};

export const StepContainer = withStyles(StepContainerComponent, (theme) => ({
  containerTitle: {
    // flex: 1,
    paddingHorizontal: 24
  },
  backButtonTitle: {
    // flex:1,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    justifyItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  containerForm: {
    flex: 6,
    paddingHorizontal: 24,
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingHorizontal: 24
  },
  h1: {
    fontSize: 20,
    lineHeight: 22,
    textAlign: 'center',
    flex:1,
  },
  h2: {
    marginTop: 8,
    fontSize: 16,
    color: theme['color-basic-400'],
    textAlign: "center"
  },
}));