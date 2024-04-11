

package com.example.healthcare.bed;

        import org.springframework.data.jpa.repository.JpaRepository;
        import org.springframework.stereotype.Repository;

        import java.util.Optional;

@Repository
public interface BedRepository extends JpaRepository<Bed, Long> {
        Optional<Bed> findFirstByOccupiedFalse();
}
