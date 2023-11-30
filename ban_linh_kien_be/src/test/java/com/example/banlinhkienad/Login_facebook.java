package com.example.banlinhkienad;

import com.example.banlinhkienad.user.dto.FacebookMailRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class Login_facebook {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void loginByFacebook_13() throws Exception {
        FacebookMailRequest facebookMailRequest = new FacebookMailRequest();

        this.mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/user/login-by-facebook")
                        .content(this.objectMapper.writeValueAsString(facebookMailRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andDo(print())
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void loginByFacebook_18() throws Exception {
        FacebookMailRequest facebookMailRequest = new FacebookMailRequest();
        facebookMailRequest.setFacebookMail("phantaanhdao@gmail.com");
        this.mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/user/login-by-facebook")
                        .content(this.objectMapper.writeValueAsString(facebookMailRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andDo(print())
                .andExpect(status().is2xxSuccessful());
    }
}
