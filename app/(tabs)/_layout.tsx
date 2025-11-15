import { Tabs } from "expo-router";
import React, { useState, useRef, useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";


export default function TabLayout() {

  const TAB_KEYS = [
    { name: "index", label: "Explore", icon: "explore.fill" },
    { name: "map", label: "Map", icon: "map.fill" },
    { name: "message", label: "Chat", icon: "chat.bubble.fill" },
    { name: "profile", label: "Profile", icon: "person.fill" },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const pillAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(pillAnim, {
      toValue: activeIndex,
      useNativeDriver: false,
      friction: 7,
      tension: 80,
    }).start();
  }, [activeIndex]);

  const handleTabPress = (routeIdx, originalHandler) => {
    setActiveIndex(routeIdx);
    if (originalHandler) originalHandler();
  };

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        initialRouteName="index"
        screenOptions={{
          tabBarActiveTintColor: "#c7c5f7ff",
          tabBarInactiveTintColor: "#A0A3B1",
          headerShown: false,
          tabBarButton: (props) => {
            // Defensive: ensure props.route and props.route.name exist
            if (!props.route || typeof props.route.name !== "string") {
              return <HapticTab {...props} />;
            }
            const routeIdx = TAB_KEYS.findIndex(
              (tab) => tab.name === props.route.name
            );
            if (routeIdx === -1) {
              return <HapticTab {...props} />;
            }
            return (
              <HapticTab
                {...props}
                onPress={() => handleTabPress(routeIdx, props.onPress)}
              />
            );
          },
          tabBarStyle: {
            backgroundColor: "#f8f8f8ff",
            borderTopWidth: 0,
            height: 80,
            shadowColor: "#000",
            shadowOpacity: 0.04,
            shadowRadius: 8,
            elevation: 6,
            width: "100%",
          },
        }}
      >
        {TAB_KEYS.map((tab, idx) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.label,
              tabBarIcon: ({ color, focused }) => {
                // Animation for active tab
                const scaleAnim = useRef(
                  new Animated.Value(focused ? 1 : 0.85)
                ).current;
                const opacityAnim = useRef(
                  new Animated.Value(focused ? 1 : 0.7)
                ).current;
                useEffect(() => {
                  Animated.spring(scaleAnim, {
                    toValue: focused ? 1 : 0.85,
                    useNativeDriver: true,
                    friction: 7,
                  }).start();
                  Animated.timing(opacityAnim, {
                    toValue: focused ? 1 : 0.7,
                    duration: 200,
                    useNativeDriver: true,
                  }).start();
                }, [focused]);
                return (
                  <View style={styles.tabIconWrapper}>
                    {focused ? (
                      <Animated.View
                        style={{
                          transform: [{ scale: scaleAnim }],
                          opacity: opacityAnim,
                          shadowColor: "#a3a3a3ff",
                          shadowOffset: { width: 0, height: 4 },
                          shadowOpacity: 0.18,
                          shadowRadius: 10,
                          elevation: 8,
                          marginBottom: 2,
                          borderRadius: 22,
                        }}
                      >
                        <LinearGradient
                          colors={["#d1eff7ff", "#60d1f7ff"]}
                          start={{ x: 0.2, y: 0 }}
                          end={{ x: 0.8, y: 1 }}
                          style={styles.activeCircleGradient}
                        >
                          <IconSymbol
                            size={28}
                            name={tab.icon}
                            color={"#fff"}
                          />
                        </LinearGradient>
                      </Animated.View>
                    ) : (
                      <IconSymbol size={30} name={tab.icon} color={"#A0A3B1"} />
                    )}
                    <Animated.Text
                      style={[
                        focused ? styles.activeLabel : styles.inactiveLabel,
                        focused && {
                          transform: [{ scale: scaleAnim }],
                          opacity: opacityAnim,
                        },
                      ]}
                    >
                      {tab.label}
                    </Animated.Text>
                  </View>
                );
              },

              tabBarLabel: () => null,
            }}
          />
        ))}
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  tabIconWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 70,
  },
  activeCircleGradient: {
    width: 40,
    height: 35,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5d6164ff",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8,
  },
  activePill: {
    backgroundColor: "rgba(66, 62, 127, 0.08)",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minWidth: 60,
  },
  activeCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#9ae6fdff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  activeLabel: {
    color: "#000000ff",
    fontWeight: "700",
    fontSize: 15,
    marginTop: 4,
    letterSpacing: 0.1,
    textShadowColor: "rgba(161, 157, 231, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  inactiveTab: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minWidth: 60,
  },
  inactiveLabel: {
    color: "#A0A3B1",
    fontWeight: "800",
    fontSize: 15,
    marginTop: 2,
    letterSpacing: 0.1,
  },
});
