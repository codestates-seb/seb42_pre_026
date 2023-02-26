package seb42_pre26.global.auth.utils;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import seb42_pre26.exception.BusinessException;
import seb42_pre26.exception.ExceptionCode;

public class GetAuthUserUtils {
    public static Authentication getAuthUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getName() == null || authentication.getName().equals("anonymousUser")){
            throw new BusinessException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        authentication.getPrincipal();
        return authentication;
    }
}
