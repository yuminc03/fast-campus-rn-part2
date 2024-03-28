import { View } from "react-native";
import Margin from "./Margin";
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
`;
const ProfileImage = styled.Image`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  borderRadius: ${(props) => props.size * 0.4}px;
`;
const TextContainer = styled.View`
  justfy-content: center;
  margin-left: 10px;
`;
const NameText = styled.Text`
  font-weight: ${(props) => props.isMe ? "bold" : "normal"};
  font-size: ${(props) => props.isMe ? 16 : 15}px;
`;
const IntroductionText = styled.Text`
  font-size: ${(props) => props.isMe ? 12 : 11 }px;
  color: gray;
`;

export default ({ uri, name, introduction, isMe }) => {
  const size = isMe ? 50 : 40;
  return (
    <Container>
      <ProfileImage source={{ uri }} size={size}/>
      <TextContainer>
        <NameText isMe={isMe}>{name}</NameText>
        {!!introduction && (
          <View>
            <Margin height={ isMe ? 6 : 2 }/>
            <IntroductionText isMe={isMe}>{introduction}</IntroductionText>
          </View>
        )}
      </TextContainer>
    </Container>
  );
};