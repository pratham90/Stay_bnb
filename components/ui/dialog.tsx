import React, { createContext, useContext, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// React Native / Expo Dialog preserving API and design semantics from Radix-based dialog

type DialogContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

export function Dialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
}

export function DialogTrigger({
  children,
  onPress,
  onLongPress,
}: {
  children: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
}) {
  const ctx = useContext(DialogContext);
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

export function DialogPortal({ children }: { children?: React.ReactNode }) {
  // Portal not needed in RN - keep as passthrough for compatibility
  return <>{children}</>;
}

export function DialogOverlay() {
  // Overlay is implemented inside DialogContent via Modal background
  return null;
}

export function DialogClose({ children, onPress }: { children?: React.ReactNode; onPress?: () => void }) {
  const ctx = useContext(DialogContext);
  return (
    <TouchableOpacity
      onPress={() => {
        onPress?.();
        ctx?.setOpen(false);
      }}
      accessibilityLabel="Close dialog"
      style={styles.closeButton}
    >
      {children ?? <MaterialIcons name="close" size={20} color="#111827" />}
    </TouchableOpacity>
  );
}

export function DialogContent({
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
  const ctx = useContext(DialogContext);
  const open = typeof visible === 'boolean' ? visible : ctx?.open;
  const setOpen = onClose ? (v: boolean) => !v && onClose() : ctx?.setOpen;

  if (!open) return null;

  return (
    <Modal transparent animationType="fade" visible={!!open} onRequestClose={() => setOpen?.(false)}>
      <Pressable style={styles.overlay} onPress={() => setOpen?.(false)}>
        <Pressable style={[styles.contentWrap]} onPress={() => {}}>
          <View style={[styles.content]}>{children}</View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function DialogHeader({ children, style }: { children?: React.ReactNode; style?: object }) {
  return (
    <View style={[styles.header, style as any]}>
      {children}
    </View>
  );
}

export function DialogFooter({ children, style }: { children?: React.ReactNode; style?: object }) {
  return (
    <View style={[styles.footer, style as any]}>
      {children}
    </View>
  );
}

export function DialogTitle({ children, style }: { children?: React.ReactNode; style?: object }) {
  return <Text style={[styles.title, style as any]}>{children}</Text>;
}

export function DialogDescription({ children, style }: { children?: React.ReactNode; style?: object }) {
  return <Text style={[styles.description, style as any]}>{children}</Text>;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  contentWrap: {
    width: '100%',
    maxWidth: 560,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 6,
    borderRadius: 6,
  },
  header: {
    marginBottom: 12,
    alignItems: 'center',
  },
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});

// Individual functions are exported above; no need for a re-export block.
