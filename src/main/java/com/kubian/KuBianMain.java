package com.kubian;

import org.apache.catalina.Context;
import org.apache.catalina.connector.Connector;
import org.apache.tomcat.util.descriptor.web.SecurityCollection;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.springframework.boot.SpringApplication;  
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerFactory;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.context.annotation.Bean;
  
  
@SpringBootApplication  
public class KuBianMain {
//	 @Bean
//	  public EmbeddedServletContainerFactory servletContainer() {
//	      TomcatEmbeddedServletContainerFactory tomcat = new TomcatEmbeddedServletContainerFactory() {
//	          @Override
//	          protected void postProcessContext(Context context) {
//	              SecurityConstraint constraint = new SecurityConstraint();
//	              constraint.setUserConstraint("CONFIDENTIAL");
//	              SecurityCollection collection = new SecurityCollection();
//	              collection.addPattern("/*");
//	              constraint.addCollection(collection);
//	              context.addConstraint(constraint);
//	          }
//	      };
//	      tomcat.addAdditionalTomcatConnectors(httpConnector());
//	      return tomcat;
//	  }
//
//	  public Connector httpConnector() {
//	      Connector connector = new Connector(TomcatEmbeddedServletContainerFactory.DEFAULT_PROTOCOL);
//	      connector.setScheme("http");
//	      //Connector监听的http的端口号
//      connector.setPort(8888);
//	      connector.setSecure(false);
//	      //监听到http的端口号后转向到的https的端口号
//	      connector.setRedirectPort(9443);
//	      return connector;
//	  }
	 @Bean
	  public EmbeddedServletContainerCustomizer containerCustomizer() {
	      return new EmbeddedServletContainerCustomizer() {
	          @Override
	          public void customize(ConfigurableEmbeddedServletContainer container) {
	              if (container instanceof TomcatEmbeddedServletContainerFactory) {
	                  TomcatEmbeddedServletContainerFactory containerFactory =
	                      (TomcatEmbeddedServletContainerFactory) container;
	                  Connector connector = new Connector(TomcatEmbeddedServletContainerFactory.DEFAULT_PROTOCOL);
	                  connector.setPort(8878);
	                  containerFactory.addAdditionalTomcatConnectors(connector);
	              }
	          }
	      };
	  }
	
    public static void main(String[] args) {  
        SpringApplication.run(KuBianMain.class, args);  
    }  
}  
