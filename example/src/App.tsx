import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import {
  startEngagement,
  stopEngagement,
  trackPageView,
} from 'parsely-react-native-sdk';

export default function App() {
  React.useEffect(() => {
    trackPageView('test.com/app');
    startEngagement('test.com/app');
    return () => {
      stopEngagement();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Sample page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
