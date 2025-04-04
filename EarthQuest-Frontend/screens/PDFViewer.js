import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const PDFViewer = ({ route }) => {
  const { url } = route.params;

  return (
    <View style={styles.container}>
      <WebView source={{ uri: url }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default PDFViewer;
