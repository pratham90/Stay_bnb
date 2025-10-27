
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

type CollapsibleProps = {
  title: string;
  children: React.ReactNode;
  style?: object;
};

export function Collapsible({ title, children, style }: CollapsibleProps) {
  const [open, setOpen] = useState(false);
  return (
    <View style={style}>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <Text>{title} {open ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {open && <View>{children}</View>}
    </View>
  );
}
