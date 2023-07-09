package com.example.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class FrontServiceImpl implements FrontService {

    /** 郵便番号検索API リクエストURL */
    private static final String URL = "https://zip-cloud.appspot.com/api/search?zipcode={zipcode}";

    @Override
    public String getAddress(String zipCode) {
        //リクエストの送信
        RestTemplate restTemplate = new RestTemplate();
        String zipCodeJson = restTemplate.getForObject(URL, String.class, zipCode);
        return zipCodeJson;
    }
}
