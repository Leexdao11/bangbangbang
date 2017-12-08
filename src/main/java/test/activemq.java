package test;

import java.io.File;

public class activemq {
    public static void main(String[] args) {
        String ROOT = System.getProperty("user.dir", ".");
        ROOT = ROOT.substring(0, ROOT.lastIndexOf(File.separator));
        ROOT = ROOT.substring(0, ROOT.lastIndexOf(File.separator));
        ROOT = ROOT + File.separator + "conf" + File.separator;
        System.out.println(ROOT);
    }
}
