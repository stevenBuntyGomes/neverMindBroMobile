import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  groupChatRename,
  groupChatAddMember,
  groupChatRemoveMember,
  fetchMessages,
} from '../../Actions/chatAction';
import { searchUser } from '../../Actions/chatAction';
import { FontAwesome } from '@expo/vector-icons';

const UpdateGroupChatModal = ({SelectedChat, user}) => {
  const dispatch = useDispatch();
  const { searchChatUsers: users } = useSelector((state) => state.userChat);
//   const { user } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRemove = async (delUser) => {
    await dispatch(groupChatRemoveMember(SelectedChat, delUser));
    await dispatch(fetchMessages(SelectedChat?._id));
  };

  const handleSearch = async (query) => {
    if (!query) return;
    setSearch(query);
    await dispatch(searchUser(query));
  };

  const handleRename = async () => {
    if (!groupChatName) return;
    await dispatch(groupChatRename(SelectedChat, groupChatName));
    setGroupChatName('');
  };

  const handleAddUser = async (userToAdd) => {
    if (selectedUsers.some((u) => u._id === userToAdd._id)) {
      Alert.alert('User already in group');
      return;
    }
    if (SelectedChat?.groupAdmin?._id !== user?._id) {
      Alert.alert('Only admins can add users.');
      return;
    }
    await dispatch(groupChatAddMember(SelectedChat, userToAdd));
  };

  useEffect(() => {
    if (SelectedChat) {
      setSelectedUsers(SelectedChat.users);
      setGroupChatName(SelectedChat.chatName);
    }
  }, [SelectedChat]);

  return (
    <View>
      <TouchableOpacity onPress={handleOpen} style={styles.iconButton}>
        <FontAwesome name="cog" size={24} color="black" />
      </TouchableOpacity>

      <Modal visible={open} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView>
              <Text style={styles.title}>{SelectedChat?.chatName}</Text>

              {SelectedChat?.groupAdmin?._id === user?._id && (
                <>
                  <View style={styles.chipContainer}>
                    {selectedUsers?.map((u) => (
                      <View key={u._id} style={styles.chip}>
                        <Image
                          source={{ uri: u.pic?.url || 'https://via.placeholder.com/40' }}
                          style={styles.avatar}
                        />
                        <Text style={styles.chipText}>{u.name}</Text>
                        {user._id !== u._id ? (<>
                          <TouchableOpacity onPress={() => handleRemove(u)}>
                            <FontAwesome name="times" size={16} color="red" />
                          </TouchableOpacity>
                        </> ) : (<></>)}
                      </View>
                    ))}
                  </View>

                  <TextInput
                    placeholder="Rename Group"
                    value={groupChatName}
                    onChangeText={setGroupChatName}
                    style={styles.input}
                  />

                  <TouchableOpacity style={styles.button} onPress={handleRename}>
                    <Text style={styles.buttonText}>Update Name</Text>
                  </TouchableOpacity>

                  <TextInput
                    placeholder="Add User"
                    onChangeText={handleSearch}
                    style={styles.input}
                    value={search}
                  />

                  <FlatList
                    data={users}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.userItem}
                        onPress={() => handleAddUser(item)}
                      >
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                    style={{ maxHeight: 200 }}
                  />
                </>
              )}

              <TouchableOpacity
                style={[styles.button, { backgroundColor: 'red' }]}
                onPress={() => handleRemove(user)}
              >
                <Text style={styles.buttonText}>Leave Group</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    padding: 20,
    maxHeight: '85%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    margin: 4,
  },
  chipText: {
    marginRight: 5,
    marginLeft: 5,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  userItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginVertical: 4,
  },
  cancelText: {
    textAlign: 'center',
    color: '#555',
    marginTop: 10,
  },
});

export default UpdateGroupChatModal;
