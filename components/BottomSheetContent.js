import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BottomSheetContent = ({
  selectedCount,
  onSelectAll,
  onDelete,
  onSave,
  onCancel,
}) => (
  <View style={styles.bottomSheetContent}>
    <TouchableOpacity
      style={styles.bottomSheetButton}
      onPress={onSelectAll}>
      <Ionicons
        name="checkmark-circle-outline"
        size={24}
        color="green"
      />
      <Text style={styles.bottomSheetButtonText}>Select All</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.bottomSheetButton}
      onPress={onDelete}>
      <Ionicons
        name="trash-outline"
        size={24}
        color="red"
      />
      <Text style={styles.bottomSheetButtonText}>
        Delete Selected {selectedCount}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.bottomSheetButton}
      onPress={onSave}>
      <Ionicons
        name="download-outline"
        size={24}
        color="blue"
      />
      <Text style={styles.bottomSheetButtonText}>
        Save to Device {selectedCount}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.bottomSheetButton}
      onPress={onCancel}>
      <Ionicons
        name="close-outline"
        size={24}
        color="gray"
      />
      <Text style={styles.bottomSheetButtonText}>Cancel</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  bottomSheetButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  bottomSheetButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default BottomSheetContent;
