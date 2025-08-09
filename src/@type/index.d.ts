declare module AuthType {
    interface Token {
        type: string;
        accessToken: string;
    }

    interface TokenResponse extends AxiosType.ResponseType {
        data: AuthType.Token;
    }

    interface UserInfo {
        memberId: number;
        memberImageUrl: string;
        memberName: string;
        memberUsername: string;
    }

    interface signUpUserData {
        password: string;
        email: string | null;
        githubId: string | null;
        githubAvatarUrl: string | null;
        userName: string | null;
    }

    interface useInputProps {
        value: string;
        onChange: (event: ChangeEvent<HTMLInputElement>) => void;
        onBlur?: () => void;
        onFocus?: () => void;
    }

    interface InputProps {
        inputName: "email" | "name" | "username" | "password" | "id" | "code";
        innerText: string;
        type: "text" | "password";
        inputProps: useInputProps;
        isValid?: boolean | null;
        isFocus?: boolean;
        hasValidator?: (value: string) => boolean;
    }
    interface resetPasswordState {
        email?: string;
    }

    type resetPasswordQuery = {
        username: string;
        code: string;
    };
}

declare module UIType {
    interface ButtonProps {
        bgColor?: string;
        radius?: number;
        color?: string;
    }

    interface ContentBoxProps {
        $padding: string;
        $margin: string;
    }
}

declare module CommonType {
    interface FooterTextProps {
        text: string;
        url?: string;
    }
    interface ImageProps {
        width: number;
        height: number;
        $position: string;
        $url: string;
        size?: string; // background-size for retina display
    }

    interface ImageInfo {
        imageUrl: string;
        imageType: string;
        imageName: string;
        imageUUID: string;
    }

    interface memberType {
        id: number;
        username: string;
        name: string;
        image: ImageInfo;
        hasStory: boolean;
    }

    interface searchResultType {
        dtype: "MEMBER" | "HASHTAG";

        // MEMBER
        follwer?: boolean;
        following?: boolean;
        followingMemberFollow?: { memberUsername: string }[];
        member?: memberType;

        // HASHTAG
        name?: string;
        postCount?: number;
    }
    interface PostImageDTOProps {
        id: number;
        postImageUrl: string;
        postTags: PostImgTagDTOProps[];
        altText: string;
        // 받아온 후 처리
    }
}

declare module EditType {
    interface editItemType {
        memberUsername: string;
        memberName: string;
        memberWebsite: string | null;
        memberIntroduce: string | null;
        memberEmail: string | null;
        memberPhone: string | null;
        memberGender: string;
    }

    type editItemKeyType =
        | "memberUsername"
        | "memberName"
        | "memberWebsite"
        | "memberIntroduce"
        | "memberEmail"
        | "memberPhone"
        | "memberGender";

    type menuType =
        | "프로필 편집"
        | "비밀번호 변경"
        | "앱 및 웹사이트"
        | "이메일 및 SMS"
        | "푸시 알림"
        | "연락처 관리"
        | "개인정보 및 보안"
        | "로그인 활동"
        | "Instagram에서 보낸 이메일"
        | "도움말";

    type modalType = "image" | "gender" | null;
}
