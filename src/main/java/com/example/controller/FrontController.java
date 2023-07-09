package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.example.form.AddressForm;
import com.example.service.FrontService;

@Controller
public class FrontController {

    @Autowired
    private FrontService frontService;

    @RequestMapping({ "/", "/index" })
    public String index() {
        return "index";
    }
    @ResponseBody
    @RequestMapping(value = "/getAddress" ,method = RequestMethod.POST, produces="application/json;charset=UTF-8")
    public String getAddress(@RequestBody(required = false) AddressForm addressForm) {
        return frontService.getAddress(addressForm.getZipcode());
    }
}
