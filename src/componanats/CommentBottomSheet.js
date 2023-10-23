import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import moment from "moment/moment";
import React, { useState } from "react";
import { COLORS, FONTFAMILY, SIZES } from "../constants/them";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../common/responsivefunction";
import CirclImage from "./CirclImage";
import Icon, { Icons } from "./Icons";
import { memo } from "react";
import { useRef } from "react";
const CommentBottomSheet = (props) => {
  const ref = useRef();
  let ReplyData = [];
  if (props.commentId !== "") {
    ReplyData = props.data.filter(
      (item, index) => item?._id === props.commentId
    );
  }

  const renderItem = ({ item, index }) => {
    return (
      <RenderItem
        item={item}
        index={index}
        onReplyPress={(replyItem) => {
          props.setIsReply(true);
          props.setCommentId(item._id);
        }}
        ProfileData={props.ProfileData}
        deleteComment={props.deleteComment}
      />
    );
  };
  const renderReply = ({ item, index }) => {
    return <RenderReplyItem item={item} index={index} />;
  };
  return (
    <Modal visible={props.isVisible} transparent>
      <View style={styles.modal}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.BottomSheetContainer}
        >
          <View style={styles.closeContainer}>
            <Text style={styles.txt}>
              {props.isReply ? "Reply" : "Comments"}
            </Text>
            <TouchableOpacity
              style={styles.close}
              onPress={() => {
                if (props.isReply) {
                  props.setIsReply(false);
                } else {
                  props.setIsVisible(false);
                }
              }}
            >
              <Icon
                type={Icons.AntDesign}
                name="close"
                color={COLORS.black}
                size={rf(3)}
              />
            </TouchableOpacity>
          </View>
          <View style={{ maxHeight: hp(76) }}>
            {props.isReply ? (
              <FlatList
                ref={props.chatListRef}
                data={ReplyData[0].replies}
                contentContainerStyle={{
                  paddingBottom: hp(12),
                }}
                showsVerticalScrollIndicator={false}
                renderItem={renderReply}
              />
            ) : (
              <FlatList
                ref={props.chatListRef}
                data={props.data}
                contentContainerStyle={{
                  paddingBottom: hp(12),
                }}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
              />
            )}
            <View style={styles.container1}>
              <View style={styles.imageInputContainer}>
                <CirclImage uri={props?.ProfileData?.avatar} />
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputText}
                    placeholder={
                      props.isReply ? "Reply Comment" : "Write Comments"
                    }
                    placeholderTextColor={COLORS.brownGrey}
                    value={props.text}
                    onChangeText={props.setText}
                    multiline
                    blurOnSubmit={true}
                  />
                  <TouchableOpacity onPress={props.onSendComment} style={{}}>
                    <Icon
                      name={"send-outline"}
                      type={Icons.Ionicons}
                      color={COLORS.BLACK}
                      style={{}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const RenderItem = ({
  item,
  index,
  onReplyPress,
  ProfileData,
  deleteComment,
}) => {
  const getTimeAgo = (createdAt) => {
    const now = moment();
    const created = moment(createdAt);
    const diff = now.diff(created);
    const duration = moment.duration(diff);
    if (duration.asSeconds() < 60) {
      return `${Math.round(duration.asSeconds())} seconds ago`;
    } else if (duration.asMinutes() < 60) {
      return `${Math.round(duration.asMinutes())} minutes ago`;
    } else if (duration.asHours() < 24) {
      return `${Math.round(duration.asHours())} hours ago`;
    } else if (duration.asDays() < 30) {
      return `${Math.round(duration.asDays())} days ago`;
    } else {
      return `${Math.round(duration.asMonths())} months ago`;
    }
  };
  const [isLikes, setIsliked] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const isUserIdExisting = item?.userId?.id === ProfileData?._id;
  return (
    <View style={[styles.renderItemContainer]}>
      <CirclImage uri={item?.userId?.avatar} />
      <View style={{ paddingLeft: wp(2) }}>
        <Text style={styles.txtTitle}>
          {item?.userId?.firstName}. {getTimeAgo(item?.createdAt)}
        </Text>
        <Text style={styles.txt1}>{item?.content?.trim()}</Text>

        <TouchableOpacity
          onPress={() => {
            onReplyPress(item);
          }}
          style={{ alignSelf: "flex-end", marginRight: wp(10) }}
        >
          <Icon
            type={Icons.Ionicons}
            name={"chatbox-outline"}
            style={styles.iconDislike}
          />
        </TouchableOpacity>
      </View>
      {isUserIdExisting && (
        <>
          <TouchableOpacity
            onPress={() => {
              setShowOption(true);
            }}
            activeOpacity={0.8}
          >
            <Icon
              type={Icons.Entypo}
              name={"dots-three-vertical"}
              style={{
                color: COLORS.black,
                fontSize: rf(2.5),
              }}
            />
          </TouchableOpacity>

          {showOption && (
            <RendorOption
              onDelete={() => {
                setShowOption(false);
                deleteComment(item._id);
              }}
              onCancel={() => {
                setShowOption(false);
              }}
              item={item}
            />
          )}
        </>
      )}
    </View>
  );
};
const RenderReplyItem = ({ item, index, onReplyPress }) => {
  const getTimeAgo = (createdAt) => {
    const now = moment();
    const created = moment(createdAt);
    const diff = now.diff(created);
    const duration = moment.duration(diff);
    if (duration.asSeconds() < 60) {
      return `${Math.round(duration.asSeconds())} seconds ago`;
    } else if (duration.asMinutes() < 60) {
      return `${Math.round(duration.asMinutes())} minutes ago`;
    } else if (duration.asHours() < 24) {
      return `${Math.round(duration.asHours())} hours ago`;
    } else if (duration.asDays() < 30) {
      return `${Math.round(duration.asDays())} days ago`;
    } else {
      return `${Math.round(duration.asMonths())} months ago`;
    }
  };
  return (
    <View style={[styles.renderItemContainer]}>
      <CirclImage uri={item?.userId?.avatar} />
      <View style={{ flex: 1, paddingLeft: wp(2) }}>
        <Text style={styles.txtTitle}>
          {item?.user?.firstName}. {getTimeAgo(item?.createdAt)}
        </Text>
        <Text style={styles.txt1}>{item?.text}</Text>
      </View>
    </View>
  );
};

const RendorOption = ({ item, onDelete, onCancel }) => {
  return (
    <>
      <View style={[styles.option]}>
        <TouchableOpacity style={{}} onPress={onDelete}>
          <Text style={[styles.txtdelete, { color: COLORS.primary }]}>
            {"Delete"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{}} onPress={onCancel}>
          <Text style={[styles.txtdelete, { marginTop: hp(1.5) }]}>
            {"Cancel"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const InputComponant = memo(({ props, ref, data }) => {
  return (
    <View style={styles.container1}>
      <View style={styles.imageInputContainer}>
        <CirclImage uri={props?.ProfileData?.avatar} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder={props.isReply ? "Reply Comment" : "Write Comments"}
            placeholderTextColor={COLORS.brownGrey}
            value={props.text}
            onChangeText={props.setText}
            multiline
            blurOnSubmit={true}
          />
          <TouchableOpacity
            onPress={() => {
              ref.current.scrollToIndex({ index: data?.length - 1 });
              // props.onSendComment();
            }}
            style={{}}
          >
            <Icon
              name={"send-outline"}
              type={Icons.Ionicons}
              color={COLORS.BLACK}
              style={{}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  modal: {
    flexGrow: 1,
    backgroundColor: COLORS.blackWithOpacity,
    justifyContent: "flex-end",
  },
  BottomSheetContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: rf(3),
    borderTopRightRadius: wp(3),
    paddingHorizontal: wp(2),
    // height: hp(80),
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.brownGrey,
    borderRadius: wp(2),
    paddingHorizontal: wp(1.5),
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    marginStart: wp(1.5),
  },
  container1: {
    backgroundColor: COLORS.white,
    paddingHorizontal: wp(2),
    height: hp(10),
    position: "absolute",
    bottom: 0,
  },
  imageInputContainer: {
    flexDirection: "row",
    marginBottom: hp(2),
  },
  closeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp("2%"),
    paddingHorizontal: wp(2),
  },
  titleContainer: { marginStart: wp(2), marginTop: hp(2) },
  inputText: { color: COLORS.black, flex: 1 },
  txtTitle: {
    fontSize: rf(1.2),
    fontFamily: FONTFAMILY.Light,
    color: COLORS.brownGrey,
  },
  likeDisLikeContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: wp(10),
  },
  line: {
    height: 4,
    width: 100,
    backgroundColor: COLORS.Greyscale,
    alignSelf: "center",
    marginTop: hp("2%"),
  },
  renderItemContainer: {
    marginTop: hp(2.5),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  close: {
    position: "absolute",
    right: 10,
  },
  iconDislike: {
    color: COLORS.brownGrey,
    fontSize: rf(2.5),
  },
  txt: {
    color: COLORS.black,
    fontFamily: FONTFAMILY.Bold,
    fontSize: rf(2.5),
    alignSelf: "center",
  },
  txt1: {
    color: COLORS.black,
    fontFamily: FONTFAMILY.Bold,
    fontSize: rf(1.5),
    width: wp(75),
  },
  option: {
    position: "absolute",
    right: 5,
    top: -10,
    width: wp(30),
    backgroundColor: COLORS.modal,
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    borderRadius: wp(2),
  },
  txtdelete: {
    fontSize: rf(1.7),
    fontFamily: FONTFAMILY.Bold,
    color: COLORS.white,
  },
});
export default CommentBottomSheet;
