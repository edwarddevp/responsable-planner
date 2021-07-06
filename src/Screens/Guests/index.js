import React from "react";
import {Layout, withStyles} from "@ui-kitten/components";
import {MainLayout} from "../../Layout/MainLayout";
import {GuestsList} from "./components/GuestsList";
import {useApiRequest} from "../../hooks/useApiRequest";
import {EVENTS_EVENTID_GUESTS} from "../../lib/apiRoutes";
import {FloatingActionButton} from "../../Shared/FloatingActionButton";
import {useScreenFocused} from "../../hooks/useScreenFocused";
import {GuestForm} from "./components/GuestForm";
import {useHandleCUModal} from "../../hooks/useHandleCUModal";
import {SeAnimation} from "../../Shared/SeAnimation";

const GuestsScreen = ({route, navigation, eva}) => {
  const styles = eva?.style;
  const {eventId, eventName, guestTotal} = route?.params || {};
  const {data, call: getGuests, loading} = useApiRequest(EVENTS_EVENTID_GUESTS(eventId))
  useScreenFocused(() => getGuests())

  const {isOpen, onOpen, onClose, itemToEdit: guestToEdit, setItemToEdit: setGuestToEdit} = useHandleCUModal()

  const isGuestLimit = data?.data?.guests?.length === guestTotal

  return (
    <MainLayout navigation={navigation} title={eventName} backButton>
      <Layout style={styles?.bg} level='3'>
        {
          loading ?
            <SeAnimation
              src={require('../../../assets/animations/loading-spinner.json')}/>
            : <>
              <GuestsList
                isGuestLimit={isGuestLimit}
                guestTotal={guestTotal}
                setGuestToEdit={setGuestToEdit}
                navigation={navigation}
                getGuests={getGuests}
                loading={loading}
                data={data}
              />
              <GuestForm
                isOpen={isOpen}
                onClose={onClose}
                eventId={eventId}
                getGuests={getGuests}
                guestToEdit={guestToEdit}
              />
              {
                !isGuestLimit &&
                <FloatingActionButton
                  onPress={onOpen}
                />
              }
            </>
        }
      </Layout>
    </MainLayout>
  );
};

export const Guests = withStyles(GuestsScreen, (theme) => ({
  bg: {
    flex: 1
    // backgroundColor: theme["color-basic-300"],
  },
  placeholder: {
    width: "100%",
    height: 200,
    backgroundColor: theme["color-basic-500"],
  },
}));
