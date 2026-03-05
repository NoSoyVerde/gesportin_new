package net.ausiasmarch.gesportin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        String username = (String) org.springframework.web.context.request.RequestContextHolder.currentRequestAttributes()
                .getAttribute("username", org.springframework.web.context.request.RequestAttributes.SCOPE_REQUEST);
        return username != null;
    }

    public String getUsername() {
        String username = (String) org.springframework.web.context.request.RequestContextHolder.currentRequestAttributes()
                .getAttribute("username", org.springframework.web.context.request.RequestAttributes.SCOPE_REQUEST);
        return username;
    }

    public boolean isAdmin() {
        String username = (String) org.springframework.web.context.request.RequestContextHolder.currentRequestAttributes()
                .getAttribute("username", org.springframework.web.context.request.RequestAttributes.SCOPE_REQUEST);
        // obtener el usuarioEntity relleno de la database utilizando el repository de usuario a partir del username y comprobar si es admin
        UsuarioEntity oUsuarioEntity = oUsuarioRepository.findByUsername(username).orElse(null);
        return oUsuarioEntity != null && oUsuarioEntity.getTipousuario().getId() == 1;
    }

    public boolean isEquipoAdmin() {
        String username = (String) org.springframework.web.context.request.RequestContextHolder.currentRequestAttributes()
                .getAttribute("username", org.springframework.web.context.request.RequestAttributes.SCOPE_REQUEST);
        // obtener el usuarioEntity relleno de la database utilizando el repository de usuario a partir del username y comprobar si es admin
        UsuarioEntity oUsuarioEntity = oUsuarioRepository.findByUsername(username).orElse(null);
        return oUsuarioEntity != null && oUsuarioEntity.getTipousuario().getId() == 2;
    }

    public boolean isUsuario() {
        String username = (String) org.springframework.web.context.request.RequestContextHolder.currentRequestAttributes()
                .getAttribute("username", org.springframework.web.context.request.RequestAttributes.SCOPE_REQUEST);
        // obtener el usuarioEntity relleno de la database utilizando el repository de usuario a partir del username y comprobar si es admin
        UsuarioEntity oUsuarioEntity = oUsuarioRepository.findByUsername(username).orElse(null);
        return oUsuarioEntity != null && oUsuarioEntity.getTipousuario().getId() == 3;
    }

}
