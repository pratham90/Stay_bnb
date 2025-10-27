import React, { createContext, useContext, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

// React Native / Expo friendly context menu
// Exports the same component names your code expects, implemented with RN primitives.

type MenuContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const MenuContext = createContext<MenuContextType | null>(null);

export function ContextMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <MenuContext.Provider value={{ open, setOpen }}>{children}</MenuContext.Provider>;
}

export function ContextMenuTrigger({
  children,
  onPress,
  onLongPress,
}: {
  children: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
}) {
  const ctx = useContext(MenuContext);
  if (!ctx) return <>{children}</>;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={(e) => {
        onPress?.(e);
        ctx.setOpen(true);
      }}
      onLongPress={(e) => {
        onLongPress?.(e);
        ctx.setOpen(true);
      }}
    >
      {children}
    </TouchableOpacity>
  );
}

export function ContextMenuContent({
  children,
  visible,
  onClose,
  centered = true,
}: {
  children: React.ReactNode;
  visible?: boolean;
  onClose?: () => void;
  centered?: boolean;
}) {
  const ctx = useContext(MenuContext);
  const open = typeof visible === 'boolean' ? visible : ctx?.open;
  const setOpen = onClose ? (v: boolean) => !v && onClose() : ctx?.setOpen;

  if (!open) return null;

  return (
    <Modal transparent animationType="fade" visible={!!open} onRequestClose={() => setOpen?.(false)}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setOpen?.(false)}>
        <View style={[styles.content, centered ? styles.centered : undefined]}>
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export function ContextMenuItem({
  children,
  onPress,
  disabled,
  inset,
  variant = 'default',
  style,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  inset?: boolean;
  variant?: 'default' | 'destructive';
  style?: object;
}) {
  const ctx = useContext(MenuContext);
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.item,
        inset ? styles.itemInset : undefined,
        variant === 'destructive' ? styles.itemDestructive : undefined,
        disabled ? styles.itemDisabled : undefined,
        style,
      ]}
      onPress={() => {
        onPress?.();
        ctx?.setOpen(false);
      }}
    >
      <Text style={[styles.itemText, variant === 'destructive' ? styles.itemTextDestructive : undefined]}>{children as any}</Text>
    </TouchableOpacity>
  );
}

export function ContextMenuCheckboxItem({
  children,
  checked,
  onToggle,
  inset,
  style,
}: {
  children: React.ReactNode;
  checked?: boolean;
  onToggle?: (next: boolean) => void;
  inset?: boolean;
  style?: object;
}) {
  const ctx = useContext(MenuContext);
  return (
    <TouchableOpacity
      style={[styles.itemRow, inset ? styles.itemInset : undefined, style]}
      onPress={() => {
        onToggle?.(!checked);
        ctx?.setOpen(false);
      }}
    >
      <MaterialIcons
        name={checked ? 'check-box' : 'check-box-outline-blank'}
        size={18}
        color={checked ? '#111827' : '#9ca3af'}
      />
      <Text style={[styles.itemText, styles.itemTextWithIcon]}>{children as any}</Text>
    </TouchableOpacity>
  );
}

export function ContextMenuRadioItem({
  children,
  selected,
  onSelect,
  inset,
  style,
}: {
  children: React.ReactNode;
  selected?: boolean;
  onSelect?: () => void;
  inset?: boolean;
  style?: object;
}) {
  const ctx = useContext(MenuContext);
  return (
    <TouchableOpacity
      style={[styles.itemRow, inset ? styles.itemInset : undefined, style]}
      onPress={() => {
        onSelect?.();
        ctx?.setOpen(false);
      }}
    >
      <MaterialIcons
        name={selected ? 'radio-button-checked' : 'radio-button-unchecked'}
        size={18}
        color={selected ? '#111827' : '#9ca3af'}
      />
      <Text style={[styles.itemText, styles.itemTextWithIcon]}>{children as any}</Text>
    </TouchableOpacity>
  );
}

export function ContextMenuLabel({ children, style }: { children: React.ReactNode; style?: object }) {
  return (
    <View style={[styles.labelContainer, style]}>
      <Text style={styles.labelText}>{children as any}</Text>
    </View>
  );
}

export function ContextMenuSeparator() {
  return <View style={styles.separator} />;
}

export function ContextMenuShortcut({ children }: { children: React.ReactNode }) {
  return <Text style={styles.shortcut}>{children as any}</Text>;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    minWidth: 260,
    maxWidth: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  centered: {},
  item: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  itemInset: {
    paddingLeft: 32,
  },
  itemDestructive: {},
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    color: '#111827',
  },
  itemTextDestructive: {
    color: '#dc2626',
  },
  itemTextWithIcon: {
    marginLeft: 8,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  labelContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  labelText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e5e7eb',
    marginVertical: 6,
  },
  shortcut: {
    marginLeft: 'auto',
    color: '#9ca3af',
    fontSize: 13,
  },
});

// Individual functions are exported above. No re-export block needed.
