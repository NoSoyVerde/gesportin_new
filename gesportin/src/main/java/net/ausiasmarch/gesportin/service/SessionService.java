package net.ausiasmarch.gesportin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import net.ausiasmarch.gesportin.bean.SessionBean;
import net.ausiasmarch.gesportin.bean.TokenBean;
import net.ausiasmarch.gesportin.entity.UsuarioEntity;
import net.ausiasmarch.gesportin.exception.UnauthorizedException;
import net.ausiasmarch.gesportin.repository.UsuarioRepository;

@Service
public class SessionService {

    @Autowired
    private JWTService oJwtService;

    @Autowired
    private UsuarioRepository oUsuarioRepository;

    public TokenBean login(SessionBean oSessionBean) {
        UsuarioEntity oUsuarioEntity = oUsuarioRepository.findByUsernameAndPassword(oSessionBean.getUsername(), oSessionBean.getPassword()).orElseThrow(() -> {
            throw new UnauthorizedException("Usuario o contraseña incorrectos");
        });
        return (new TokenBean(oJwtService.generateJWT(oSessionBean.getUsername(), oUsuarioEntity.getTipousuario().getId(), oUsuarioEntity.getClub().getId())));
    }

    public boolean isSessionActive() {
        return getUsername() != null;
    }

    public String getUsername() {
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        if (requestAttributes == null) {
            return null;
        }
        return (String) requestAttributes.getAttribute("username", RequestAttributes.SCOPE_REQUEST);
    }

    public boolean isAdmin() {
        String username = getUsername();
        if (username == null) {
            return false;
        }
        UsuarioEntity oUsuarioEntity = oUsuarioRepository.findByUsername(username).orElse(null);
        return oUsuarioEntity != null && oUsuarioEntity.getTipousuario().getId() == 1;
    }

    public boolean isEquipoAdmin() {
        String username = getUsername();
        if (username == null) {
            return false;
        }
        UsuarioEntity oUsuarioEntity = oUsuarioRepository.findByUsername(username).orElse(null);
        return oUsuarioEntity != null && oUsuarioEntity.getTipousuario().getId() == 2;
    }

    public boolean isUsuario() {
        String username = getUsername();
        if (username == null) {
            return false;
        }
        UsuarioEntity oUsuarioEntity = oUsuarioRepository.findByUsername(username).orElse(null);
        return oUsuarioEntity != null && oUsuarioEntity.getTipousuario().getId() == 3;
    }

}
