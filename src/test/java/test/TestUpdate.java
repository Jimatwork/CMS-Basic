package test;

public class TestUpdate {
	public static void main(String[] args) {
	
		s = s.replaceAll("font-size:9=", "");
		// s = s.replaceAll("font-size:18px", "font-size:18px;");
		try {
			String news = "";
			String[] str = s.split("font-size:");

			for (int i = 0; i < str.length; i++) {
				String stes = str[i];
				System.out.println(stes);
				if (i > 0) {
					String strs = stes.substring(0, stes.indexOf('"'));
					if (strs.indexOf(";") != -1) {
						String f = stes.substring(0, stes.indexOf(";"));
						System.out.println(stes);
						if (f.indexOf("p") != -1) {
							String a1 = stes.substring(0, stes.indexOf("p"));
							double dd = Double.parseDouble(a1);
							double cs = dd / 16;
							String newStr = "font-size:" + cs + "em";
							StringBuilder sb1 = new StringBuilder(stes);
							sb1.replace(0, stes.indexOf(";"), newStr);
							stes = sb1.toString();
						} else {
							StringBuilder sb1 = new StringBuilder(stes);
							sb1.insert(0, "font-size:");
							stes = sb1.toString();
						}
					} else {
						String f = stes.substring(0, stes.indexOf("'"));
						System.out.println(stes);
						if (f.indexOf("p") != -1) {
							String a1 = stes.substring(0, stes.indexOf("p"));
							double dd = Double.parseDouble(a1);
							double cs = dd / 16;
							String newStr = "font-size:" + cs + "em;";
							StringBuilder sb1 = new StringBuilder(stes);
							sb1.replace(0, stes.indexOf("'"), newStr);
							stes = sb1.toString();
						} else {
							StringBuilder sb1 = new StringBuilder(stes);
							sb1.insert(0, "font-size:");
							stes = sb1.toString();
						}
					}

				}
				news += stes;
			}
			System.out.println(news);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}