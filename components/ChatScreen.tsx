
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import { Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Avatar } from './ui/avatar';

interface Message {
  id: number;
  text: string;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9fafb',
    },
    chatItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: 12,
    },
    chatInfo: {
      flex: 1,
    },
    chatName: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#333',
    },
    chatLast: {
      color: '#888',
      fontSize: 14,
    },
    chatMeta: {
      alignItems: 'flex-end',
    },
    chatTime: {
      fontSize: 12,
      color: '#aaa',
    },
    unreadBadge: {
      backgroundColor: '#06b6d4',
      borderRadius: 10,
      paddingHorizontal: 6,
      paddingVertical: 2,
      marginTop: 4,
    },
    unreadText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
    },
    chatScreen: {
      flex: 1,
      backgroundColor: '#fff',
    },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    avatarLarge: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginHorizontal: 12,
    },
    messages: {
      flex: 1,
      padding: 16,
    },
    messageMe: {
      alignSelf: 'flex-end',
      backgroundColor: '#e0f7fa',
      borderRadius: 12,
      marginBottom: 8,
      padding: 10,
      maxWidth: '70%',
    },
    messageOther: {
      alignSelf: 'flex-start',
      backgroundColor: '#f1f5f9',
      borderRadius: 12,
      marginBottom: 8,
      padding: 10,
      maxWidth: '70%',
    },
    messageText: {
      fontSize: 15,
      color: '#333',
    },
    messageTime: {
      fontSize: 11,
      color: '#888',
      marginTop: 4,
      textAlign: 'right',
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderTopWidth: 1,
      borderTopColor: '#eee',
    },
    input: {
      flex: 1,
      height: 40,
      fontSize: 16,
      color: '#333',
      backgroundColor: '#f9fafb',
      borderRadius: 8,
      paddingHorizontal: 12,
      marginRight: 8,
    },
  });
            ))}
          </ScrollView>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={messageText}
              onChangeText={setMessageText}
              onFocus={() => setIsTyping(true)}
            />
            <TouchableOpacity onPress={handleSend}>
              <Feather name="send" size={24} color="#06b6d4" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  chatLast: {
    color: '#888',
    fontSize: 14,
  },
  chatMeta: {
    alignItems: 'flex-end',
  },
  chatTime: {
    fontSize: 12,
    color: '#aaa',
  },
  unreadBadge: {
    backgroundColor: '#06b6d4',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  chatScreen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatarLarge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 12,
  },
  messages: {
    flex: 1,
    padding: 16,
  },
  messageMe: {
    alignSelf: 'flex-end',
    backgroundColor: '#e0f7fa',
    borderRadius: 12,
    marginBottom: 8,
    padding: 10,
    maxWidth: '70%',
  },
  messageOther: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    marginBottom: 8,
    padding: 10,
    maxWidth: '70%',
  },
  messageText: {
    fontSize: 15,
    color: '#333',
  },
  messageTime: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
    textAlign: 'right',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
});
    {
      id: 4,
      name: 'David Martinez',
      avatar: 'https://i.pravatar.cc/150?img=33',
      lastMessage: 'Perfect, see you tomorrow!',
      time: 'Yesterday',
      online: false
    },
  ];

  const messages: Message[] = [
    {
      id: 1,
      text: 'Hi! I\'m interested in booking your place',
      sender: 'other',
      time: '10:30 AM',
      avatar: 'https://images.unsplash.com/photo-1539605480396-a61f99da1041?w=100'
    },
    {
      id: 2,
      text: 'Hello! I\'d be happy to help. What dates are you looking at?',
      sender: 'me',
      time: '10:32 AM'
    },
    {
      id: 3,
      text: 'I\'m looking at next weekend, Friday to Sunday',
      sender: 'other',
      time: '10:33 AM',
      avatar: 'https://images.unsplash.com/photo-1539605480396-a61f99da1041?w=100'
    },
    {
      id: 4,
      text: 'Perfect! Those dates are available. The total would be $240 for 2 nights.',
      sender: 'me',
      time: '10:35 AM'
    },
    {
      id: 5,
      text: 'The apartment looks amazing! When can I check in?',
      sender: 'other',
      time: '10:36 AM',
      avatar: 'https://images.unsplash.com/photo-1539605480396-a61f99da1041?w=100'
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (messageText.trim()) {
      // Simulate sending message
      setMessageText('');
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  if (selectedChat) {
    const chat = chats.find(c => c.id === selectedChat)!;
    
    return (
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
        className="h-full bg-white flex flex-col"
      >
        {/* Chat Header */}
        <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedChat(null)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          
          <div className="relative">
            <Avatar className="w-10 h-10">
              <img src={chat.avatar} alt={chat.name} />
            </Avatar>
            {chat.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-sm">{chat.name}</h3>
            <p className="text-xs text-gray-500">{chat.online ? 'Active now' : 'Offline'}</p>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Phone className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Video className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <MoreVertical className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex gap-2 ${message.sender === 'me' ? 'flex-row-reverse' : ''}`}
              >
                {message.sender === 'other' && (
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <img src={message.avatar} alt="Avatar" />
                  </Avatar>
                )}
                
                <div className={`flex flex-col ${message.sender === 'me' ? 'items-end' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                      message.sender === 'me'
                        ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-br-sm'
                        : 'bg-gray-100 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </motion.div>
                  <span className="text-xs text-gray-500 mt-1 px-2">{message.time}</span>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-2 items-end"
              >
                <Avatar className="w-8 h-8">
                  <img src={chat.avatar} alt="Avatar" />
                </Avatar>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      import React, { useState } from 'react';
                      import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
                      import { Feather } from '@expo/vector-icons';

                      interface Message {
                        id: number;
                        text: string;
                        sender: 'me' | 'other';
                        time: string;
                        avatar?: string;
                      }

                      interface Chat {
                        id: number;
                        name: string;
                        avatar: string;
                        lastMessage: string;
                        time: string;
                        unread?: number;
                        online?: boolean;
                      }

                      export function ChatScreen() {
                        const [selectedChat, setSelectedChat] = useState<number | null>(null);
                        const [messageText, setMessageText] = useState('');
                        const [isTyping, setIsTyping] = useState(false);

                        const chats: Chat[] = [
                          {
                            id: 1,
                            name: 'Sarah Anderson',
                            avatar: 'https://images.unsplash.com/photo-1539605480396-a61f99da1041?w=100',
                            lastMessage: 'The apartment looks amazing! When can I check in?',
                            time: '2m ago',
                            unread: 2,
                            online: true
                          },
                          {
                            id: 2,
                            name: 'Michael Chen',
                            avatar: 'https://i.pravatar.cc/150?img=12',
                            lastMessage: 'Thanks for the quick response!',
                            time: '1h ago',
                            online: true
                          },
                          {
                            id: 3,
                            name: 'Emma Wilson',
                            avatar: 'https://i.pravatar.cc/150?img=5',
                            lastMessage: 'Is parking included?',
                            time: '3h ago',
                            unread: 1,
                            online: false
                          },
                        ];

                        const messages: Message[] = [
                          {
                            id: 1,
                            text: 'Hello! Is the apartment available?',
                            sender: 'me',
                            time: '2m ago',
                          },
                          {
                            id: 2,
                            text: 'Yes, it is! When would you like to check in?',
                            sender: 'other',
                            time: '1m ago',
                            avatar: chats[0].avatar,
                          },
                        ];

                        const handleSend = () => {
                          setMessageText('');
                          setIsTyping(false);
                          // Add message logic here
                        };

                        return (
                          <View style={styles.container}>
                            {!selectedChat ? (
                              <FlatList
                                data={chats}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                  <TouchableOpacity style={styles.chatItem} onPress={() => setSelectedChat(item.id)}>
                                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                                    <View style={styles.chatInfo}>
                                      <Text style={styles.chatName}>{item.name}</Text>
                                      <Text style={styles.chatLast}>{item.lastMessage}</Text>
                                    </View>
                                    <View style={styles.chatMeta}>
                                      <Text style={styles.chatTime}>{item.time}</Text>
                                      {item.unread ? (
                                        <View style={styles.unreadBadge}><Text style={styles.unreadText}>{item.unread}</Text></View>
                                      ) : null}
                                    </View>
                                  </TouchableOpacity>
                                )}
                              />
                            ) : (
                              <View style={styles.chatScreen}>
                                <View style={styles.topBar}>
                                  <TouchableOpacity onPress={() => setSelectedChat(null)}>
                                    <Feather name="arrow-left" size={24} color="#333" />
                                  </TouchableOpacity>
                                  <Image source={{ uri: chats[selectedChat - 1].avatar }} style={styles.avatarLarge} />
                                  <Text style={styles.chatName}>{chats[selectedChat - 1].name}</Text>
                                </View>
                                <ScrollView style={styles.messages}>
                                  {messages.map((msg) => (
                                    <View
                                      key={msg.id}
                                      style={msg.sender === 'me' ? styles.messageMe : styles.messageOther}
                                    >
                                      <Text style={styles.messageText}>{msg.text}</Text>
                                      <Text style={styles.messageTime}>{msg.time}</Text>
                                    </View>
                                  ))}
                                </ScrollView>
                                <View style={styles.inputRow}>
                                  <TextInput
                                    style={styles.input}
                                    placeholder="Type a message..."
                                    value={messageText}
                                    onChangeText={setMessageText}
                                    onFocus={() => setIsTyping(true)}
                                  />
                                  <TouchableOpacity onPress={handleSend}>
                                    <Feather name="send" size={24} color="#06b6d4" />
                                  </TouchableOpacity>
                                </View>
                              </View>
                            )}
                          </View>
                        );
                      }

                      const styles = StyleSheet.create({
