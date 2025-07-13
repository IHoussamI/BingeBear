package com.example.bingebeariptv.Services;

import com.example.bingebeariptv.Models.FreeTrialRequest;
import com.example.bingebeariptv.Respositories.FreeTrialRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class FreeTrialRequestService {

    @Autowired
    private FreeTrialRequestRepository freeTrialRequestRepository;

    // @Autowired
    //private JavaMailSender mailSender;  // For sending emails

    // private Map<String, String> verificationTokens = new HashMap<>();

    public FreeTrialRequest createFreeTrialRequest(String email, String firstName, Long whatsappNumber) {
        if (freeTrialRequestRepository.findByEmail(email) != null) {
            throw new RuntimeException("Email already in use.");
        }
        if (freeTrialRequestRepository.findByWhatsappNumber(whatsappNumber) != null) {
            throw new RuntimeException("WhatsApp number already in use.");
        }
        FreeTrialRequest request = new FreeTrialRequest();
        request.setEmail(email);
        request.setFirstName(firstName);
        request.setWhatsappNumber(whatsappNumber);

        request.setVerified(true);


        FreeTrialRequest savedRequest = freeTrialRequestRepository.save(request);
        System.out.println("Saved request: " + savedRequest);
        return savedRequest;
    }

    public String generateVerificationToken(String email) {
        return UUID.randomUUID().toString();
    }

    public void sendVerificationEmail(String email, String firstName) {
        // String token = generateVerificationToken(email);
        //verificationTokens.put(token, email);
        // String verificationUrl = "https://api.line-sat.com/free-trial/verify?token=" + token;

        // String htmlMsg = "<html>" +
        //     "<body style='font-family: Arial, sans-serif;'>" +
        //      "<h2 style='color: #2E86C1;'>Vérifiez votre demande d'essai gratuit</h2>" +
        //      "<p>Bonjour " + firstName + ",</p>" +
        //      "<p>Merci de vous être inscrit à notre essai gratuit. Veuillez cliquer sur le bouton ci-dessous pour vérifier votre demande :</p>" +
        //      "<a href='" + verificationUrl + "' style='display: inline-block; padding: 10px 20px; " +
        //      "background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;'>Vérifier maintenant</a>" +
        //      "<p>Si vous n'avez pas demandé d'essai gratuit, veuillez ignorer cet e-mail.</p>" +
        //      "<p>Cordialement,<br>LineSat</p>" +
        //      "</body>" +
        //      "</html>";
        //try {
        //  MimeMessage mimeMessage = mailSender.createMimeMessage();
        //  MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        //  helper.setTo(email);
        //  helper.setSubject("Verify Your Free Trial Request");
        //  // Set 'true' to indicate the text is HTML
        //  helper.setText(htmlMsg, true);
        //  mailSender.send(mimeMessage);
        //  System.out.println("Styled verification email sent to " + email);
        // } catch (MessagingException ex) {
        // ex.printStackTrace();
        //}
    }

    public boolean verifyFreeTrialRequest(String token) {
        // String email = verificationTokens.get(token);
        //if (email != null) {
        //  FreeTrialRequest request = freeTrialRequestRepository.findByEmail(email);
        //  if (request != null && !request.isVerified()) {
        //      request.setVerified(true);
        //      freeTrialRequestRepository.save(request);
        //      verificationTokens.remove(token);
        //      return true;
        //  }
        //}
        return false;
    }
}